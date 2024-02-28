import { AspectRatio, Box, HStack, VStack } from "@/styled-system/jsx"
import { RocketIcon } from "@radix-ui/react-icons"
import { Button, Heading } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"



export const SearchSection = () => {
    return (
        <VStack
            pt={{
                base: '16px',
                md: '100px',
            }}
            w='full'
            background={`radial-gradient(100% 100% at 50.01% 100%, #30A46C 0%, rgba(255, 255, 255, 0.00) 100%)`}
        >
            <VStack 
                w='full' 
                px={{
                    base: '16px',
                    sm: '68px',
                    md: '122px',
                    lg: '186px'
                }}
                gap='20px'
                alignItems={{
                    base: 'start',
                    sm: 'center'
                }}
            >
                <VStack gap='0' 
                    alignItems={{
                        base: 'start',
                        sm: 'center'
                    }}
                >
                    <Heading size='6' color='green' 
                        align={{
                            initial: 'left',
                            sm: 'center'
                        }}
                    >See What AI Can Do For You</Heading>
                    <Heading size={{
                        initial: '7',
                        sm: '8'
                    }} align={{
                        initial: 'left',
                        sm: 'center'
                    }}>Increase Your Operating Leverage Today</Heading>
                </VStack>

                <HStack>
                    <Link href='/contact-us'><Button variant="outline"><RocketIcon/>Schedule a Demo!</Button></Link>
                </HStack>
                <Box pt='30px' w='full'>
                    <AspectRatio ratio={1.685} w='full' >
                        <Image
                            src={'/assets/marketing.mockups/macbook.cut.search.png'} 
                            alt='graph-background'
                            fill={true}
                        />
                    </AspectRatio>
                </Box>
            </VStack>
        </VStack>
    )
}