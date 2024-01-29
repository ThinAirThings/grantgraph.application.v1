import { auth } from "@/src/libs/auth/auth";
import { VStack } from "@/styled-system/jsx";
import {  Heading, ScrollArea, Text } from "@radix-ui/themes";
import { SearchQueryForm } from "./client.SearchQueryForm";
import { MatchResults } from "./client.MatchResults";
import { getCachedSavedGrantIds } from "@/src/cache/getCachedSavedGrantIds";


export default async function () {
    const savedGrantIds = await getCachedSavedGrantIds({
        ...(await auth())!.user!
    })
    return (
        <VStack alignItems='start' w='full'>
            <Heading>{`AI Powered Grant Search`}</Heading>
            <SearchQueryForm />
            <VStack pl='3' gap='3' alignItems='start' w='full'>
                <Text color='gray' weight='bold'>Results</Text>
                <ScrollArea type="always" scrollbars="vertical" style={{height: `calc(100vh - 275px)`}}>
                    <MatchResults
                        savedGrantIds={savedGrantIds}
                    />
                </ScrollArea>
            </VStack>
        </VStack>
    )
}