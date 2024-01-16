import { auth } from "@/app/libs/auth/auth"
import { Heading, Text } from "@radix-ui/themes"
import { redirect } from "next/navigation"
import {BoxIcon, CubeIcon, GearIcon, HomeIcon} from "@radix-ui/react-icons"
import { Grid, VStack } from "@/styled-system/jsx"
import { css } from "@/styled-system/css"
import { SidebarRoot } from "@/app/ui/Sidebar/Sidebar.Root"
import { SidebarItem } from "@/app/ui/Sidebar/Sidebar.Item"

export default async function ({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()
    if (!(session?.user?.role === 'superadmin')) {
        redirect('/superadmin/login')
    }

    return (
        <Grid className={css({
            gridTemplateColumns: '200px minmax(0, 1fr)',
        })}>
           <SidebarRoot superadmin={true}>
                <SidebarItem location='top' href='/superadmin/dashboard/organizations' >
                    <CubeIcon/><Text>Organizations</Text>
                </SidebarItem>
                <SidebarItem location='bottom' href='/superadmin/dashboard/settings' >
                    <GearIcon/><Text>Settings</Text>
                </SidebarItem>
            </SidebarRoot>
            <VStack px={12} py={10} w='full' alignItems={'start'}>
                {children}
            </VStack>
        </Grid>
    )
}