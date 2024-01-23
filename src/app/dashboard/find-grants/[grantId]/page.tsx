import { getCachedOpenGrant } from "@/src/cache/getCachedOpenGrant"
import { Divider, HStack, VStack } from "@/styled-system/jsx"
import { GrantHeader } from "./client.GrantHeader"
import { GrantTabs } from "./client.GrantTabs"
import { SimilarGrants } from "./server.SimilarGrants"
import { Flex, ScrollArea } from "@radix-ui/themes"
import { auth } from "@/src/libs/auth/auth"
import { getCachedSavedGrantIds } from "@/src/cache/getCachedSavedGrantIds"



export default async function ({
    params
}: {
    params: {
        grantId: string
    }
}) {
    const grantData = await getCachedOpenGrant(params.grantId)
    const {savedGrantIds} = await getCachedSavedGrantIds({
        ...(await auth())!.user!
    })
    return (
        <VStack alignItems='start' w='full' maxHeight={'full'}>
            <HStack justify={'space-between'} w='full'>
                <GrantHeader 
                    title={grantData.title}
                    savedGrantIds={savedGrantIds}
                    grantId={params.grantId}
                />
            </HStack>
            <ScrollArea type="always" scrollbars="vertical" style={{
                height: `calc(100vh - 130px)`, 
            }}>
                <Flex direction='column' pr='4' style={{maxWidth: '100%'}} gap='3'>
                    <GrantTabs grantData={grantData}/> 
                    <Divider orientation={'horizontal'} w='full' color={`slate.7`}/>
                    <SimilarGrants grantId={params.grantId}/>
                </Flex>
            </ScrollArea>
        </VStack>
    )
}