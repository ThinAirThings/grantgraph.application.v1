import { getCachedOpenGrants } from "@/src/cache/getCachedOpenGrants";
import { getCachedSavedGrantIds } from "@/src/cache/getCachedSavedGrantIds";
import { MatchCardClient } from "@/src/components/MatchCard/client.MatchCardClient";
import { auth } from "@/src/libs/auth/auth";
import { VStack } from "@/styled-system/jsx";
import { Flex, Heading, ScrollArea } from "@radix-ui/themes";



export default async function () {
    const {savedGrantIds} = await getCachedSavedGrantIds({
        ...(await auth())!.user!
    })
    const savedOpenGrants = (await getCachedOpenGrants())!
        .filter(grant => savedGrantIds?.includes?.(grant.grantId))
    return (
        <VStack alignItems='start' w='full'>
            <Heading>Saved Grant Opportunities</Heading>
            <ScrollArea type="always" scrollbars="vertical" style={{height: `calc(100vh - 130px)`}}>
                <Flex direction={'column'} gap='3' pr='4'>
                    {savedOpenGrants.map(grant => (
                        <MatchCardClient
                            key={grant.grantId}
                            grant={grant}
                            savedGrantIds={savedGrantIds}
                        />
                    ))}
                </Flex>
            </ScrollArea>
        </VStack>
    )
}