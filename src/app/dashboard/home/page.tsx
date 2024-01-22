import { auth } from "@/src/libs/auth/auth";
import { VStack } from "@/styled-system/jsx";
import { Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { MatchCard } from "./server.MatchCard";
import { dynamodb } from "@/src/libs/aws/dynamodb.client";
import { unstable_cache as cache } from 'next/cache';
import { cosineSimilarity } from "@/src/libs/vectors/cosineSimilarity";


export type GrantMatch = {
    grantId: string
    title: string
    opportunityNumber: string
    agency: string
    openDate: string
    closeDate: string
    rawDescription: string
    grantSourceUrl: string
    awardCeiling: number
    awardFloor: number
    awardEstimate: number
    embedding: number[]
    similarity: number
}
const getCachedMatches = cache(async ({
    organizationId,
    userId
}: {
    organizationId: string
    userId: string
}): Promise<GrantMatch[]> => {
    const researcherEmbedding = (await dynamodb.get({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        }
    })).Item?.embedding
    if (!researcherEmbedding) return []
    // Get Grant Embeddings
    const grantEmbeddings = (await dynamodb.scan({
        TableName: process.env.GRANTS_TABLE,
    }))?.Items?.map(({
        grantId,
        title,
        agency,
        openDate,
        closeDate,
        metadata: {
            opportunityNumber
        },
        details: {
            grantSourceUrl,
            rawDescription,
            embedding
        },
        financials: {
            awardCeiling,
            awardFloor,
            awardEstimate
        }
    }) => ({
        grantId,
        title,
        opportunityNumber,
        openDate,
        closeDate,
        agency,
        rawDescription,
        embedding,
        grantSourceUrl,
        awardCeiling,
        awardFloor,
        awardEstimate
    }))
    // Calculate Similarity
    const matches = grantEmbeddings?.map((grant) => ({
        ...grant,
        similarity: cosineSimilarity(researcherEmbedding, grant.embedding)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 20)
    return matches!
}, ['matches'], {
    tags: ['matches'],
    revalidate: 60,
})

export default async function () {
    const session = await auth()
    if (!(session?.user?.role === 'user')) {
        redirect('/dashboard')
    }
    const matches = await getCachedMatches(session?.user)
    return (
        <VStack alignItems='start' w='full'>
            <Heading>{`Welcome ${session?.user?.name?.split(' ')[0]}!`}</Heading>
            <VStack pl='3' gap='3' alignItems='start' w='full'>
                <Text color='gray' weight='bold'>Your Feed</Text>
                <ScrollArea type="always" scrollbars="vertical" style={{height: `calc(100vh - 175px)`}}>
                    <Flex direction={'column'} style={{maxHeight: '100%'}} pr='4' gap='3'>
                        {matches.map(match => <MatchCard 
                            key={match.grantId}
                            match={match}
                        />)}
                    </Flex>
                </ScrollArea>
            </VStack>
        </VStack>
    )
}