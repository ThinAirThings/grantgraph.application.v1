import { redirect } from "next/navigation"
import { ReactNode } from "react"
import { Grid, VStack } from "@/styled-system/jsx"
import { BookmarkIcon, FileTextIcon, GearIcon, HomeIcon, MagnifyingGlassIcon, PersonIcon } from "@radix-ui/react-icons"
import { Text } from "@radix-ui/themes"
import { auth } from "@/src/libs/auth/auth"
import { SidebarRoot } from "@/src/interface/Sidebar/Sidebar.Root"
import { SidebarItem } from "@/src/interface/Sidebar/Sidebar.Item"

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
                    <PersonIcon/><Text weight='medium'>Manage</Text>
                </SidebarItem>}
                {role === 'user' && <SidebarItem location='top' href='/dashboard/home' >
                    <HomeIcon/><Text weight='medium'>Home</Text>
                </SidebarItem>}
                <SidebarItem location='top' href='/dashboard/find-grants' >
                    <MagnifyingGlassIcon/><Text weight='medium'>Find Grants</Text>
                </SidebarItem>
                {role === 'user' && <SidebarItem location='top' href='/dashboard/knowledge-base' >
                    <FileTextIcon/><Text weight='medium'>Knowledge Base</Text>
                </SidebarItem>}
                <SidebarItem location='top' href='/dashboard/saved-grants' >
                    <BookmarkIcon/><Text weight='medium'>Saved Grants</Text>
                </SidebarItem>
                <SidebarItem location='bottom' href='/dashboard/settings' >
                    <GearIcon/><Text weight='medium'>Settings</Text>
                </SidebarItem>
            </SidebarRoot>
            <VStack px={10} py={8} w='full' alignItems={'start'} maxHeight='screen'>
                {children}
            </VStack>
        </Grid>
    )
}