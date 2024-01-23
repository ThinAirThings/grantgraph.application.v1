import { auth } from "@/src/libs/auth/auth";
import { VStack } from "@/styled-system/jsx";
import { Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { getCachedAutoMatches } from "@/src/cache/getCachedAutoMatches";
import { MatchCardClient } from "@/src/components/MatchCard/client.MatchCardClient";
import { getCachedSavedGrantIds } from "@/src/cache/getCachedSavedGrantIds";


export default async function () {
    const session = await auth()
    if (!(session?.user?.role === 'user')) {
        redirect('/dashboard')
    }
    const matches = await getCachedAutoMatches(session?.user)
    const {savedGrantIds} = await getCachedSavedGrantIds({
        ...(session)!.user!
    })
    return (
        <VStack alignItems='start' w='full'>
            <Heading>{`Welcome ${session?.user?.name?.split(' ')[0]}!`}</Heading>
            <VStack pl='3' gap='3' alignItems='start' w='full'>
                <Text color='gray' weight='bold'>Your Feed</Text>
                <ScrollArea type="always" scrollbars="vertical" style={{height: `calc(100vh - 175px)`}}>
                    <Flex direction={'column'} style={{maxHeight: '100%'}} pr='4' gap='3'>
                        {matches.map(match => <MatchCardClient
                            key={match.grantId}
                            grant={match}
                            savedGrantIds={savedGrantIds}
                        />)}
                    </Flex>
                </ScrollArea>
            </VStack>
        </VStack>
    )
}