import { redirect } from "next/navigation"
import { auth } from "../libs/auth/auth"
import { ReactNode } from "react"
import { Grid, VStack } from "@/styled-system/jsx"
import { SidebarRoot } from "../ui/Sidebar/Sidebar.Root"
import { SidebarItem } from "../ui/Sidebar/Sidebar.Item"
import { FileTextIcon, GearIcon, HomeIcon, PersonIcon } from "@radix-ui/react-icons"
import { Text } from "@radix-ui/themes"

export default async function ({
    children
}: {
    children: ReactNode
}) {
    // Check Authentication
    const session = await auth()
    if (!((session?.user?.role === 'admin') || (session?.user?.role === 'user'))) {
        redirect('/login')
    }
    const role = session?.user?.role
    return (
        <Grid gridTemplateColumns='200px minmax(0, 1fr)' overflow='hidden' maxHeight='screen'>
           <SidebarRoot superadmin={false}>
                {role === 'admin' && <SidebarItem location='top' href='/dashboard/manage' >
                    <PersonIcon/><Text>Manage</Text>
                </SidebarItem>}
                {role === 'user' && <SidebarItem location='top' href='/dashboard/home' >
                    <HomeIcon/><Text>Home</Text>
                </SidebarItem>}
                {role === 'user' && <SidebarItem location='top' href='/dashboard/knowledge-base' >
                    <FileTextIcon/><Text>Knowledge Base</Text>
                </SidebarItem>}
                <SidebarItem location='bottom' href='/dashboard/settings' >
                    <GearIcon/><Text>Settings</Text>
                </SidebarItem>
            </SidebarRoot>
            <VStack px={12} py={10} w='full' alignItems={'start'}>
                {children}
            </VStack>
        </Grid>
    )
}