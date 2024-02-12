import { Box, HStack, VStack } from "@/styled-system/jsx"
import { PersonIcon, RocketIcon } from "@radix-ui/react-icons"
import { Button, Heading } from "@radix-ui/themes"
import Link from "next/link"


export const Hero = () => {
    return (
        <VStack 
            py={{
                base: '64px',
                sm: '96px',
            }} 
            gap={{
                base: '20px',
                sm: '32px',
            }}
            px={{
                base: '32px',
                sm: '64px',
                md: '150px'
            }}
        >
        <VStack
            gap='5px'
        >
                <Heading as='h1' size={{
                    initial: '8',
                    xs: '9',
                }}
                    align={{
                        initial: 'left',
                        xs: 'center'
                    }}
                >AI Powered Grant Tools for Research Institutes</Heading>
                <Heading as='h1' color='gray' size={{
                    initial: '4',
                    xs: '6',
                }}
                    align={{
                        initial: 'left',
                        sm: 'center'
                    }}
                >GrantGraph provides research institutes with a suite of tools for finding, writing, and winning grant opportunities.</Heading>
        </VStack>
        <HStack gap='12px'>
            <Link href='/login'><Button><RocketIcon/>Start Now</Button></Link>
            <Link href='/contact-us'><Button variant='outline'><PersonIcon/>Contact Sales</Button></Link>
        </HStack>
        </VStack>
    )
}