import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';
import { getCachedOpenGrants } from './getCachedOpenGrants';
import { cosineSimilarity } from '../libs/vectors/cosineSimilarity';

export type GrantEntry = {
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
}

export const getCachedAutoMatches = cache(async ({
    organizationId,
    userId
}: {
    organizationId: string,
    userId: string
}): Promise<GrantEntry[]> => {
    const {
        embedding: researcherEmbedding,
        savedGrantIds
    } = (await dynamodb.get({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        }
    })).Item!
    if (!researcherEmbedding) return []
    // Get Grant Embeddings
    const grantEmbeddings = await getCachedOpenGrants()
    // Calculate Similarity
    const matches = grantEmbeddings?.map((grant) => ({
        ...grant,
        saved: savedGrantIds?.includes(grant.grantId),
        similarity: cosineSimilarity(researcherEmbedding, grant.embedding)
    }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 20)
    return matches!
}, ['auto-matches'], {
    tags: ['auto-matches'],
})