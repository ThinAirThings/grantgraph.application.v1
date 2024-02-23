'use client'

import { Flex, Grid, HStack, VStack, AspectRatio } from "@/styled-system/jsx"
import { Button, Heading, Tabs, Text } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"


export const HowsItWorkTabs = () => {
    return (
        <VStack w='full' alignItems='start'>
            {/* Tabs */}
            <Tabs.Root defaultValue="professors" >
                <Tabs.List style={{width: '100%', height: '50px'}} >
                    <Tabs.Trigger value="professors">Professors</Tabs.Trigger>
                    <Tabs.Trigger value="students" disabled>
                        <VStack gap='0'>
                            <Text>Students</Text>
                            <Text size='1' color='gray'>{`(Coming soon)`}</Text>
                        </VStack>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="admins" disabled>
                        <VStack gap='0'>
                            <Text>Administrators</Text>
                            <Text size='1' color='gray'>{`(Coming soon)`}</Text>
                        </VStack>
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="professors" >
                    <VStack alignItems='start' gap='20px' pt='16px'>
                        <Heading >For Research Professors</Heading>
                            <Flex gap='30px' alignItems='start' flexDirection={{
                                base: 'column',
                                sm: 'row'
                            }}>
                                <Step
                                    number={1}
                                    title='Sign up with your university email.'
                                    description='We’ll automatically locate your faculty profile, publications, and patents to generate a personalized research profile. '
                                />
                                <Step
                                    number={2}
                                    title='Provide additional information.'
                                    description='The more details you give on your research interests, the better our matches will be.'
                                />
                                <Step
                                    number={3}
                                    title='Find collaborators and get funded.'
                                    description='Coffeehouse will match you with collaborators and funding opportunities.'
                                />
                            </Flex>
                            <VStack 
                                w={{
                                    base: 'full',
                                }}
                            >
                                <Tabs.Root defaultValue="search" style={{width: '100%'}}>
                                    <Tabs.List>
                                        <Tabs.Trigger value="search">Search</Tabs.Trigger>
                                        <Tabs.Trigger value="matches">Matches</Tabs.Trigger>
                                        <Tabs.Trigger value="groups">Groups</Tabs.Trigger>
                                    </Tabs.List>
                                        <MockupTab mockup='search'/>
                                        <MockupTab mockup='matches'/>
                                        <MockupTab mockup='groups'/>
                                </Tabs.Root>
                            </VStack>
                    </VStack>
                </Tabs.Content>
            </Tabs.Root>
        </VStack>
    )
}


const MockupTab: FC<{
    mockup: 'search' | 'matches' | 'groups'
}> = ({
    mockup
}) => {
    return  (   
        <Tabs.Content value={mockup}>
            <VStack py='100px' display={{
                base: 'none',
                sm: 'flex'
            }}>
                <AspectRatio ratio={1.6563} w='full'>
                    <Image
                        src={`/assets/marketing.mockups/macbook.${mockup}.png`}
                        alt="Picture of a macbook"
                        fill={true}
                    />
                </AspectRatio>
            </VStack>
            <VStack py='50px' display={{
                base: 'flex',
                sm: 'none'
            }}>
                <AspectRatio ratio={0.5} w='full'>
                    <Image
                        src={`/assets/marketing.mockups/iphone.${mockup}.png`}
                        alt="Picture of an iphone"
                        fill={true}
                    />
                </AspectRatio>
            </VStack>
        </Tabs.Content>    
    )
}

const Step: FC<{
    number: number
    title: string
    description: string
}> = ({
    number,
    title,
    description
}) => {
    return (
        <HStack justify='start' alignItems='start' gap='4' >
            <VStack justify='center' alignItems='center' minH='26' minW='26' borderRadius={5} bg='token(colors.orange.10)'>
                <Text>{number}.</Text>
            </VStack>
            <VStack alignItems='start' gap='3px'>
                <Heading size='4'>{title}</Heading>
                <Text size='2'>{description}</Text>
            </VStack>
        </HStack>
    )
}