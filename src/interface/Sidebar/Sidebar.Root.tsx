'use client'


import { HStack, VStack } from "@/styled-system/jsx"
import { Children, FC, ReactNode } from "react"
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Image from "next/image";
import Link from "next/link";
import { ExitIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import { signOutAction } from "@/src/libs/auth/signOutAction";

export const SidebarRoot: FC<{
    superadmin?: boolean
    children: ReactNode
}> = ({
    superadmin,
    children
}) => {
    const topItems = Children.toArray(children).filter((child) => {
        return (child as any).props.location === 'top'
    })
    const bottomItems = Children.toArray(children).filter((child) => {
        return (child as any).props.location === 'bottom'
    })
    return (
        <NavigationMenu.Root asChild>
            <VStack justify={'space-between'} h='screen' pt={10} pb={8} gap='5' borderRight={`1px solid token(colors.slate.8)`}>
                <VStack gap='5'>
                    <Link href={`/${superadmin?'superadmin/':''}dashboard`}>
                        <Image
                            src="/assets/logos.grantgraph/logo.square.svg"
                            height={75}
                            width={75}
                            alt="grantgraph-logo"
                        />
                    </Link>
                    <NavigationMenu.List asChild>
                        <VStack w={200} px={3} py={1}>
                            {topItems}
                        </VStack>
                    </NavigationMenu.List>
                </VStack>
                <NavigationMenu.List asChild>
                    <VStack w={200} px={3} py={1}>
                        {bottomItems}
                        <HStack alignItems='center' w='full' px='3' py='1' cursor={'pointer'}
                            onClick={() => signOutAction()}
                        >
                           <ExitIcon/><Text weight='medium'>Logout</Text>
                        </HStack>
                    </VStack>
                </NavigationMenu.List>
            </VStack>
        </NavigationMenu.Root>
    )
}


