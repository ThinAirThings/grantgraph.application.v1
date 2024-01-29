'use client'

import { Grid, GridItem, styled } from "@/styled-system/jsx"
import { Badge, Box, Card, Flex, Heading, IconButton, Strong, Text, Tooltip } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { BarChartIcon, InfoCircledIcon, Link2Icon } from "@radix-ui/react-icons"
import { BookmarkButton } from "../BookmarkButton/client.BookmarkButton"
import { StrippedGrantEntry } from "@/src/types/GrantEntry"
import { GrantMatch } from "@/src/types/GrantMatch"

const StyledCard = styled(Card)

export const GrantFeedCard: FC<{
    grant: StrippedGrantEntry | GrantMatch,
    userSavedGrantIds: string[]
}> = ({ 
    grant,
    userSavedGrantIds
}) => {
    const router = useRouter()
    const isGrantMatch = (grant: StrippedGrantEntry | GrantMatch): grant is GrantMatch => {
        return (grant as GrantMatch).percentMatch !== undefined;
    };
    return (
        <StyledCard w='full' 
            onClick={() => router.push(`/dashboard/find-grants/${grant.grantId}`)}
            cursor='pointer'
        >
            <Grid gridTemplateColumns={`5fr 1fr`} gap='4'>
                <Flex direction={'column'} gap='2'>
                    <Flex gap='3' align='center'>
                        <Heading size='4'>{grant.title}</Heading>
                        {grant.grantSourceUrl && 
                        <Box style={{marginTop: '10px'}} onClick={(event) => event.stopPropagation()}>
                            <a href={grant.grantSourceUrl} target='_blank' >
                                <IconButton size='1' color='gray' variant='ghost'><Link2Icon/></IconButton>
                            </a>
                        </Box>}
                        <BookmarkButton
                            savedGrantIds={userSavedGrantIds}
                            grantId={grant.grantId}
                        />
                    </Flex>
                    <Text size='3' color='gray' weight='bold'>{grant.agency}</Text>
                    <Flex gap='3'>
                        {[{
                            label: 'Award Ceiling',
                            value: grant.awardCeiling
                        }, {
                            label: 'Award Floor',
                            value: grant.awardFloor
                        }, {
                            label: 'Award Estimate',
                            value: grant.awardEstimate
                        }].map(({label, value}) => (
                            <Flex key={label} direction={'column'} align='center'>
                                <Heading size='3' align='center'>{label}</Heading>
                                <Text weight='bold' color='gray' size='2' align='center'>
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }).format(parseInt(value))}
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
                    <Text><Strong>Opportunity Number:</Strong> {grant.opportunityNumber}</Text>
                    <Text size='2'>{grant.rawDescription?.slice(0, 500)}...</Text>
                    {isGrantMatch(grant) && (<>
                        <Flex gap='3' align={'center'}>
                            <Heading size='3'>Why this match?</Heading>
                            <Badge color='green' radius='full' >
                                <BarChartIcon/>
                                <Text mt='1'>{Math.round(grant.percentMatch*100)}</Text>
                                <Tooltip content="Internal score representing how strong of a match this grant is.">
                                    <Box mx='2' style={{marginTop: '1px'}}>
                                        <IconButton 
                                            size='1' 
                                            radius='small'
                                            variant='ghost'
                                            color='gray'
                                        ><InfoCircledIcon width={15} height={15}/></IconButton>
                                    </Box>
                                </Tooltip>
                            </Badge>
                        </Flex>
                        <Text size='2'>{grant.matchReason}</Text>
                    </>)}
                </Flex>
                <Grid 
                    gridTemplateColumns={`repeat(6, minmax(0, 1fr))`}
                    gridTemplateRows={`repeat(2, minmax(0, 1fr))`} 
                    gap='4'
                >
                    <GridItem colSpan={3}>
                        <Flex direction={'column'} align='center'>
                            <Heading size='3'>Posted</Heading>
                            <Text weight='bold' color='gray' size='2'>{grant.openDate}</Text>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Flex direction={'column'} align='center'>
                            <Heading size='3'>Closes</Heading>
                            <Text weight='bold' color='gray' size='2'>{grant.closeDate}</Text>
                        </Flex>
                    </GridItem>
                </Grid>
            </Grid>
        </StyledCard>
    )
}