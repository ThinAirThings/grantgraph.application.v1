
import { Box, Grid, HStack, VStack } from "@/styled-system/jsx"
import { ArchiveIcon, MagicWandIcon, MagnifyingGlassIcon, PersonIcon } from "@radix-ui/react-icons"
import { IconProps } from "@radix-ui/react-icons/dist/types"
import { Heading, Text } from "@radix-ui/themes"
import { FC, ReactNode } from "react"
import { FeatureTabs } from "./client.FeatureTabs"
import { BoltIcon, ChatBubbleLeftRightIcon, DocumentMagnifyingGlassIcon, RocketLaunchIcon, UsersIcon } from "@heroicons/react/20/solid"



export const Features = () => {
    return (
        <VStack
            px={{
                base: '16px',
                md: '64px',
                lg: '256px',
            }}
            py={{
                base: '73px',
                sm: '128px',
            }}
        >
            {/* <FeatureTabs/> */}
            <Grid 
                mt='20px'
                columns={{
                    base: 1,
                    sm: 2,
                }} 

                gap={{
                    base: '60px',
                    sm: '40px',
                }}
            >
                <FeatureBlock
                    title='Seamlessly Network with Auto-generated Faculty Profiles'
                    Icon={BoltIcon}
                >
                    <Text>{`We automate the onboarding process to organize your entire research staff into a categorized dashboard. GrantGraph’s AI indexes the information you need without the work.`}</Text>
                </FeatureBlock>
                <FeatureBlock
                    title={`The Smartest Grant Search You've Ever Seen`}
                    Icon={RocketLaunchIcon}
                >
                    <Text>{`Search the same way you think. After chatting with our search engine you'll understand why AI is such a big deal.`}</Text>
                </FeatureBlock>
                <FeatureBlock
                    title='Intelligent Team Recommendations'
                    Icon={UsersIcon}
                >
                    <Text>{`The GrantGraph networking engine shows individuals exactly why they should work together. GrantGraph identifies patterns in data based on past funding, publications, and current ambitions.`}</Text>
                </FeatureBlock>
                <FeatureBlock
                    title='Talk to your Documents'
                    Icon={DocumentMagnifyingGlassIcon}
                >
                    <Text>{`Tired of reading 50 pages NOFOs? With GrantGraph you can talk to the document itself. Ask it questions about eligibility, timelines, and other requirements with exact citations indicating where the information was pulled from.`}</Text>
                </FeatureBlock>
            </Grid>
        </VStack>

    )
}

const FeatureBlock: FC<{
    title: string,
    Icon: FC<IconProps> | typeof DocumentMagnifyingGlassIcon,
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
            <VStack alignItems='start' gap='5px'>
                <Heading as='h3'>{title}</Heading>
                {children}
            </VStack>
        </HStack>
    )
}