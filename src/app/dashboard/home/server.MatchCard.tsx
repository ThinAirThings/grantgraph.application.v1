import { Grid, GridItem, styled } from "@/styled-system/jsx"
import { Box, Card, Flex, Heading, IconButton, Strong, Text } from "@radix-ui/themes"
import { FC } from "react"
import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from "@/src/libs/aws/dynamodb.client";
import { BookmarkIcon, HeadingIcon, Link1Icon, Link2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { GrantMatch } from "./page";

const StyledCard = styled(Card)


export const MatchCard: FC<{
    match: GrantMatch
}> = async ({
    match
}) => {
    return (
        <StyledCard w='full'>
            <Grid gridTemplateColumns={`5fr 1fr`} gap='4'>
                <Flex direction={'column'} gap='2'>
                    <Flex gap='3' align='center'>
                        <Heading size='4'>{match.title}</Heading>
                        <Link href={match.grantSourceUrl??''} target='_blank' style={{marginTop: '10px'}}>
                            <IconButton size='1' color='gray' variant='ghost'><Link2Icon/></IconButton>
                        </Link>
                        <IconButton size='2' color='gray' variant='ghost'><BookmarkIcon/></IconButton>
                    </Flex>
                    <Text size='3' color='gray' weight='bold'>{match.agency}</Text>
                    <Flex gap='3'>
                        {[{
                            label: 'Award Ceiling',
                            value: match.awardCeiling
                        }, {
                            label: 'Award Floor',
                            value: match.awardFloor
                        }, {
                            label: 'Award Estimate',
                            value: match.awardEstimate
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
                    <Text><Strong>Opportunity Number:</Strong> {match.opportunityNumber}</Text>
                    
                    <Text size='2'>{match.rawDescription.slice(0, 500)}...</Text>
                </Flex>
                <Grid 
                    gridTemplateColumns={`repeat(6, minmax(0, 1fr))`}
                    gridTemplateRows={`repeat(2, minmax(0, 1fr))`} 
                    gap='4'
                >
                    <GridItem colSpan={3}>
                        <Flex direction={'column'} align='center'>
                            <Heading size='3'>Posted</Heading>
                            <Text weight='bold' color='gray' size='2'>{match.openDate}</Text>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Flex direction={'column'} align='center'>
                            <Heading size='3'>Closes</Heading>
                            <Text weight='bold' color='gray' size='2'>{match.closeDate}</Text>
                        </Flex>
                    </GridItem>
                </Grid>
                {/* <Flex gap='4'>
                    <Flex direction={'column'} align='center'>
                        <Heading size='3'>Posted</Heading>
                        <Text weight='bold' color='gray' size='2'>{match.openDate}</Text>
                    </Flex>
                    <Flex direction={'column'} align='center'>
                        <Heading size='3'>Closes</Heading>
                        <Text weight='bold' color='gray' size='2'>{match.closeDate}</Text>
                    </Flex>
                </Flex> */}
            </Grid>
        </StyledCard>
    )
}