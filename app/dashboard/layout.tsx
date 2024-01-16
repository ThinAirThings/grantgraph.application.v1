import { redirect } from "next/navigation"
import { auth } from "../libs/auth/auth"
import { ReactNode } from "react"
import { css } from "@/styled-system/css"
import { VStack } from "@/styled-system/jsx"
import { SidebarRoot } from "../ui/Sidebar/Sidebar.Root"
import { SidebarItem } from "../ui/Sidebar/Sidebar.Item"
import { CubeIcon, GearIcon, HomeIcon } from "@radix-ui/react-icons"
import { Text } from "@radix-ui/themes"

export default async function ({
    children
}: {
    children: ReactNode
}) {
    // Check Authentication
    const session = await auth()
    if (!session?.user) {
        redirect('/login')
    }
    return (
        <div className={css({
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            height: 'screen',
        })}>
           <SidebarRoot>
                <SidebarItem location='top' href='/superadmin/dashboard/organizations' >
                    <CubeIcon/><Text>Organizations</Text>
                </SidebarItem>
                <SidebarItem location='bottom' href='/superadmin/dashboard/settings' >
                    <GearIcon/><Text>Settings</Text>
                </SidebarItem>
            </SidebarRoot>
            <VStack>
                {children}
            </VStack>
        </div>
    )
}