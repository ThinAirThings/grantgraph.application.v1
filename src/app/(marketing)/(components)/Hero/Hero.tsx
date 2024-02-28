import { Box, HStack, VStack } from "@/styled-system/jsx"
import { PersonIcon, RocketIcon } from "@radix-ui/react-icons"
import { Button, Heading } from "@radix-ui/themes"
import Link from "next/link"
import graphbackground from '../../../../../public/assets/marketing.backgrounds/graph.background.png'

export const Hero = () => {
    return (
        <VStack 
            pt={{
                base: '150px',
                sm: '230px',
            }}
            pb={{
                base: '60px',
                sm: '180px',
            }}
            gap={{
                base: '20px',
                sm: '32px',
            }}
            px={{
                base: '16px',
                sm: '64px',
                lg: '350px'
            }}
            position={'relative'}
            style={{
                backgroundImage: `url(${graphbackground.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.80)', // This is your overlay color, adjust as needed
                zIndex: 1,
            }}/>
            <VStack
                gap='20px'
                position={'relative'}
                zIndex={2}
            >
                <Heading as='h1' 
                    size={{
                        initial: '8',
                        xs: '9',
                    }}
                    
                    align='center'
                >Grant Funding.<br/>Simplified with AI.</Heading>
                <Heading as='h1' color='gray' size={{
                    initial: '4',
                    xs: '6',
                }}
                    align='center'
                >GrantGraph is an AI-powered network of researchers, publications, and open funding opportunities. We offer intelligent search and recommendations for research teams seeking grant funding.</Heading>
            </VStack>
            <HStack gap='12px'
                position={'relative'}
                zIndex={2}
            >
                {/* <Link href='/try-now'><Button><RocketIcon/>Start Now</Button></Link> */}
                <Link href='/contact-us'><Button variant='outline'><PersonIcon/>Get in Touch</Button></Link>
            </HStack>
        </VStack>
    )
}