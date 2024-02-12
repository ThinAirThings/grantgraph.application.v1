
import { Box, Grid, HStack, VStack } from "@/styled-system/jsx"
import { ArchiveIcon, MagicWandIcon, MagnifyingGlassIcon, PersonIcon } from "@radix-ui/react-icons"
import { IconProps } from "@radix-ui/react-icons/dist/types"
import { Heading, Text } from "@radix-ui/themes"
import { FC, ReactNode } from "react"
import { FeatureTabs } from "./client.FeatureTabs"



export const Features = () => {
    return (
        <VStack
            px={{
                base: '32px',
                sm: '256px',
            }}
            py={{
                base: '16px',
                sm: '32px',
            }}
        >
            <FeatureTabs/>
            <Grid 
                mt='20px'
                columns={{
                    base: 1,
                    sm: 2,
                }} 

                gap={{
                    base: '16px',
                    sm: '40px',
                }}
            >
                <FeatureBlock
                    title='Automatically Crawls your Faculty Pages'
                    Icon={ArchiveIcon}
                >
                    <Text>GrantGraph automatically scans your faculty pages, indexing information about the researchers at your institute. It intelligently organizes your entire research staff into a categorized dashboard.</Text>
                </FeatureBlock>
                <FeatureBlock
                    title={`The Smartest Grant Search You've Ever Seen`}
                    Icon={MagnifyingGlassIcon}
                >
                    <Text>{`Intelligent search filtering grants by eligibility, difficulty, and tuned for a specific researcher. It's amazing what you can do with a little AI.`}</Text>
                </FeatureBlock>
                <FeatureBlock
                    title='Automated Grant Matching'
                    Icon={MagicWandIcon}
                >
                    <Text>{`Like Amazon product recommendations for your team of researchers. GrantGraph matches based on past funding, publications, and current ambitions and opportunities.`}</Text>
                </FeatureBlock>
                <FeatureBlock
                    title='Matching Researchers to Researchers'
                    Icon={PersonIcon}
                >
                    <Text>{`Go and get those massive opportunities with researcher to researcher matching to form interdisciplinary teams.`}</Text>
                </FeatureBlock>
            </Grid>
        </VStack>

    )
}

const FeatureBlock: FC<{
    title: string,
    Icon: FC<IconProps>,
    children: ReactNode,
}> = ({
    title,
    Icon,
    children,
}) =>  {
    return (
        <HStack alignItems={'start'} gap='24px'>
            <HStack bg='token(colors.green.9)' p='7px' borderRadius={'8px'}>
                <Icon width={22} height={22} color='white'/>
            </HStack>
            <VStack alignItems='start'>
                <Heading as='h3'>{title}</Heading>
                {children}
            </VStack>
        </HStack>
    )
}