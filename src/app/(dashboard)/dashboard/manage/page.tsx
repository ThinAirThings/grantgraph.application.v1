import { CreateUserDialog } from "@/src/api/users/client.CreateUserDialog";
import { auth } from "@/src/libs/auth/auth";
import { HStack, VStack, styled } from "@/styled-system/jsx";
import { Box, Heading, ScrollArea, Table, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { UserRow } from "./client.UserRow";
import { getCachedOrganization } from "../../superadmin/dashboard/organizations/[organizationId]/page";


export default async function () {
    const session = await auth()
    if (!(session?.user?.role === 'admin')) {
        redirect('/dashboard')
    }
    const organization = await getCachedOrganization(session?.user?.organizationId)

    return (
        <VStack alignItems='start' w='full'>
            <Heading>{`Welcome ${session?.user?.name?.split(' ')[0]}!`}</Heading>
            <VStack pl='3' gap='3' alignItems='start' w='full'>
                <HStack gap='8'>
                    <Text color='gray' weight='bold'>Employee List</Text>
                    <CreateUserDialog
                        organizationId={organization!.organizationId} 
                        organizationName={organization!.organizationName}
                    />
                </HStack>
                <ScrollArea type="always" scrollbars="vertical" style={{height: `calc(100vh - 175px)`}}>
                    <Box pr='4'>
                    <Table.Root style={{width: '100%', position: 'relative'}}>
                        <Table.Header style={{width: '100%'}}>
                            <Table.Row style={{width: '100%'}}>
                                <Table.ColumnHeaderCell>Employee Name</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Account Type</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Last Signed In</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Matches Found</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Open Opportunities</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {organization?.users && Object.values(organization.users).filter(user => user.userId !== session.user?.userId).map(user => (
                                <UserRow user={user} key={user.userId}/>
                            ))}
                        </Table.Body>
                    </Table.Root>   
                    </Box>
                </ScrollArea>
            </VStack>
        </VStack>
    )
}