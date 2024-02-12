'use client'

import { Box, Grid, VStack, styled } from "@/styled-system/jsx"
import { Badge, Card, Flex, Heading, Tabs, Text } from "@radix-ui/themes"
import Image from "next/image"
import indexingMacbook from '../../../../../public/assets/marketing.mockups/IndexingFaculty.png'
import searchMacbook from '../../../../../public/assets/marketing.mockups/find-grants.png'
import matchMacbook from '../../../../../public/assets/marketing.mockups/match.png'
import { FC, ReactNode } from "react"

const StyledCard = styled(Card)
export const FeatureTabs = () => {
    return (
        <VStack w='full'>
            <StyledCard w='full' p='24px'>
                <Tabs.Root defaultValue="crawl">
                    <VStack alignItems={'start'}>
                        <Heading>Benefits</Heading>
                        <Tabs.List style={{width: '100%'}} size={{
                            initial: '1',
                            sm: '2'
                        }}>
                            <Tabs.Trigger value="crawl">Auto Crawl</Tabs.Trigger>
                            <Tabs.Trigger value="search">Search</Tabs.Trigger>
                            <Tabs.Trigger value="automatch">Grant Match</Tabs.Trigger>
                        </Tabs.List>
                    </VStack>
                    <Tabs.Content value="crawl" >
                        <SplitGrid>
                            <VStack alignItems={'start'}>
                                <BadgeTag color='orange' text='Crawl Faculty Pages' num={1}/>
                                <BadgeTag color='yellow' text='Automatic Onboarding' num={2}/>
                                <BadgeTag color='green' text='Categorize in Admin Panel' num={3}/>
                            </VStack>
                            <Image
                                src={indexingMacbook}
                                alt="Picture of a macbook"
                            />
                        </SplitGrid>
                    </Tabs.Content>
                    <Tabs.Content value="search" >
                        <SplitGrid>
                            <VStack alignItems={'start'}>
                                <BadgeTag color='orange' text='Natural Language Search' num={1}/>
                                <BadgeTag color='yellow' text='Eligibility Filtering' num={2}/>
                                <BadgeTag color='green' text='Save Opportunities' num={3}/>
                            </VStack>
                            <Image
                                src={searchMacbook}
                                alt="Picture of a macbook"
                            />
                        </SplitGrid>
                    </Tabs.Content>
                    <Tabs.Content value="automatch" >
                        <SplitGrid>
                            <VStack alignItems={'start'}>
                                <BadgeTag color='orange' text='Match to Specific Researcher' num={1}/>
                                <BadgeTag color='yellow' text='Links to All Relevant Grant Information' num={2}/>
                                <BadgeTag color='green' text='Automated Emailing of Opportunities' num={3}/>
                            </VStack>
                            <Image
                                src={matchMacbook}
                                alt="Picture of a macbook"
                            />
                        </SplitGrid>
                    </Tabs.Content>
                </Tabs.Root>
            </StyledCard>
        </VStack>
    )
}

const BadgeTag: FC<{
    color: Parameters<typeof Badge>[0]['color']
    text: string
    num: number
}> = ({color, text, num}) => {
    return (
        <Flex align={'center'}>
            <Badge color={color}>{num}</Badge>
            <Text ml='2' size={{
                initial: '3',
                sm: '4' 
            }} weight='bold'>{text}</Text>
        </Flex>
    )
}
const SplitGrid: FC<{
    children: ReactNode
}> = ({
    children
}) => {
    return (
        <Grid
            p={{
                base: '16px',
                sm: '32px',
            }}
            columns={{
                base: 1,
                sm: 2,
            }}
            gridTemplateColumns={{
                base: `minmax(0, 1fr)`,
                sm: `minmax(0, 1fr) minmax(0, 2fr)`
            }}
        >
            {children}
        </Grid>
    )
}