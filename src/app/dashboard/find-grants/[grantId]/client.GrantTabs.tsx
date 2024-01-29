'use client'
import { Flex, Heading, Tabs, Text } from "@radix-ui/themes"
import { FC } from "react"
import { getCachedOpenGrant } from "@/src/cache/getCachedOpenGrant"



export const GrantTabs: FC<{
    grantData: Awaited<ReturnType<typeof getCachedOpenGrant>>
}> = ({
    grantData
}) => {
    return (
        <Tabs.Root defaultValue="overview" style={{width: '100%'}}>
            <Tabs.List>
                <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            </Tabs.List>
            <Flex p='3'>
                <Tabs.Content value="overview">
                    <Flex gap='3' direction={'column'}>
                        <Flex gap='5'>
                            <Flex gap='3'>
                                <Text weight='bold'>Posted</Text>
                                <Text color='gray' weight='bold'>{grantData.openDate}</Text>
                            </Flex>
                            <Flex gap='3'>
                                <Text weight='bold'>Closes</Text>
                                <Text color='gray' weight='bold'>{grantData.closeDate}</Text>
                            </Flex>
                        </Flex>
                        <Heading color='gray' size='2'>{grantData.agency}</Heading>
                        <Text>{grantData.rawDescription}</Text>
                    </Flex>
                </Tabs.Content>
                <Tabs.Content value="documents">
                    <div>
                        <h1>Documents</h1>
                    </div>
                </Tabs.Content>
            </Flex>

        </Tabs.Root>
    )
}