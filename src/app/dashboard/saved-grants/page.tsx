import { getCachedOpenGrants } from "@/src/cache/getCachedOpenGrants";
import { getCachedSavedGrantIds } from "@/src/cache/getCachedSavedGrantIds";
import { GrantFeedCard } from "@/src/components/GrantFeedCard/client.GrantFeedCard";
import { auth } from "@/src/libs/auth/auth";
import { VStack } from "@/styled-system/jsx";
import { Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";



export default async function () {
    const savedGrantIds = await getCachedSavedGrantIds({
        ...(await auth())!.user!
    })
    const savedOpenGrants = (await getCachedOpenGrants(...savedGrantIds))!
    return (
        <VStack alignItems='start' w='full'>
            <Heading>Saved Grant Opportunities</Heading>
            <ScrollArea type="always" scrollbars="vertical" style={{height: `calc(100vh - 130px)`}}>
                <Flex direction={'column'} gap='3' pr='4'>
                    {savedOpenGrants.length > 0 
                    ? savedOpenGrants.map(grant => (
                        <GrantFeedCard
                            key={grant.grantId}
                            grant={grant}
                            userSavedGrantIds={savedGrantIds}
                        />
                    ))
                    : <Text>You have no saved grants! Click the bookmark icon on a grant to save it.</Text>}
                </Flex>
            </ScrollArea>
        </VStack>
    )
}