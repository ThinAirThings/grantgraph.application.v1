'use client'
import { Box, HStack} from "@/styled-system/jsx"
import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons"
import { Button, Flex, IconButton, Popover, Text } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const Header = () => {
    const [menuState, setMenuState] = useState<boolean>(false)
    const router = useRouter()
    return (
        <HStack position={'fixed'} zIndex={10} py='3' w='full' borderBottom='1px solid token(colors.slate.7)' px='6'
            justify={{
                base: 'space-between',
            }} 
            alignItems={{
                base: 'center',
                sm: 'end' 
            }}
            backdropFilter='auto'
            backdropBlur={'sm'}
            h='68px'
        >
            <HStack alignItems={'end'}>
                <Flex gap='6' align='end' >
                    <Link href='/'><Image src={'assets/logos.grantgraph/logo.square.dark.svg'} width={50} height={50} alt="grantgraph-logo"/></Link>
                </Flex>
                {/* Desktop Menu */}
                <HStack hideBelow={'sm'} ml='8' gap='7' fontWeight='bold' mb={'1'}>
                    <Link href='/'>Home</Link>
                    {/* <Link href='/try-now'>Try Now</Link> */}
                </HStack>
            </HStack>
            <HStack hideBelow={'sm'}>
                <Button variant='outline' onClick={() => router.push('/contact-us')} style={{cursor:'pointer'}}><PersonIcon/>Contact Sales</Button>
                <Button onClick={() => router.push('/try-now')} style={{cursor:'pointer'}}>Sign In</Button>
            </HStack>
            {/* Mobile Menu */}
            <Box hideFrom={'sm'}>
                <Popover.Root
                    open={menuState}
                    onOpenChange={setMenuState}
                >
                    <Popover.Trigger >
                        <IconButton variant='outline' ><HamburgerMenuIcon/></IconButton>
                    </Popover.Trigger>
                    <Popover.Content style={{ width: '90vw', marginTop: '10px'}}>
                        <Flex direction={'column'} gap='3'>
                            <Text onClick={() => {
                                router.push('/')
                                setMenuState(false)
                            }}>Home</Text>
                            {/* <Text onClick={() => {
                                router.push('/try-now')
                                setMenuState(false)
                            }}>Try Now</Text> */}
                            <Text onClick={() => {
                                router.push('/contact-us')
                                setMenuState(false)
                            }}>Contact Us</Text>
                        </Flex>
                    </Popover.Content>
                </Popover.Root>
            </Box>
        </HStack>
    )
}