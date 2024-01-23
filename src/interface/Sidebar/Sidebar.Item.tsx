'use client'
import { usePathname } from "next/navigation"
import { FC, ReactNode } from "react"
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { HStack } from "@/styled-system/jsx";
import Link from "next/link";

export const SidebarItem: FC<{
    href: string
    location: 'top' | 'bottom'
    admin?: boolean
    children: ReactNode
}> = ({
    href,
    location: _location,
    admin,
    children
}) => {
    const pathname = usePathname()
    return (
        <NavigationMenu.Item asChild>
            <HStack alignItems='center' w='full' >
                <Link href={href} style={{width: '100%'}}>
                    <NavigationMenu.Link asChild>
                        <HStack 
                            px={3} py={1}
                            w='full'
                            borderRadius={'md'}
                            aria-selected={pathname.includes(href)}
                            _selected={{backgroundColor: 'green.a.4', color: 'green.11'}}
                        >{children}</HStack>
                    </NavigationMenu.Link>
                </Link>
            </HStack>
        </NavigationMenu.Item>
    )
}