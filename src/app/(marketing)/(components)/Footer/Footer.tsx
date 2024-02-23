import { Box, HStack, VStack } from "@/styled-system/jsx"
import { DotFilledIcon } from "@radix-ui/react-icons"
import { Flex, Separator, Text } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"


export const Footer = () => {
    return (
        <VStack w='full' pb='40px' >
            <Separator size="4" />
            <HStack 
                pt='50px'
                justify={'space-between'} 
                px={{
                    base: '32px',
                    sm: '256px',
                }}
                w='full'
            >
                <VStack alignItems={'start'}>
                    <Text size='3' weight='medium'>Links</Text>
                    <Link href='/'><Text size='2' weight='regular'>Home</Text></Link>
                    {/* <Link href='/pricing'><Text size='2' weight='regular'>Pricing</Text></Link> */}
                    <Link href='/contact-us'><Text size='2' weight='regular'>Contact Us</Text></Link>
                </VStack>
                <VStack></VStack>
            </HStack>
            <Separator my="3" size="4" />
            <Flex justify={'center'} width='100%' align='end' mt='3' gap='5'>
                <Flex direction={'column'} gap="2" justify={'center'} align='center'>
                    <Image src="/assets/logos.grantgraph/logo.long.dark.svg" width={200} height={100} alt="full-logo"/>
                    <Flex><DotFilledIcon style={{color:"var(--blue-10)"}}/><Text size='1' color='blue'>Systems in Beta</Text></Flex>
                    <Text align='right' size={'1'} color='gray'>Copyright @ 2024 GrantGraph. All rights reserved.</Text>
                </Flex> 
            </Flex> 
        </VStack>
    )
}