'use client'

import { GrantEntry } from "@/src/cache/getCachedAutoMatches"
import { Grid, GridItem, styled } from "@/styled-system/jsx"
import { Box, Card, Flex, Heading, IconButton, Strong, Text } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { Link2Icon } from "@radix-ui/react-icons"
import { BookmarkButton } from "../BookmarkButton/client.BookmarkButton"

const StyledCard = styled(Card)

export const MatchCardClient: FC<{
    grant: GrantEntry,
    savedGrantIds: string[]
}> = ({ 
    grant,
    savedGrantIds
}) => {
    const router = useRouter()

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
                            savedGrantIds={savedGrantIds}
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
                                    }).format(value)}
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
                    <Text><Strong>Opportunity Number:</Strong> {grant.opportunityNumber}</Text>
                    
                    <Text size='2'>{grant.rawDescription.slice(0, 500)}...</Text>
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