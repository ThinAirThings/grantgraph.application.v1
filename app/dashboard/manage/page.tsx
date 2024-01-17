import { auth } from "@/app/libs/auth/auth";
import { getCachedOrganization } from "@/app/superadmin/dashboard/organizations/[organizationId]/page";
import { CreateUserDialog } from "@/app/ui/dialogs/CreateUserDialog/CreateUserDialog";
import { EditUserDropdown } from "@/app/ui/dropdown-menus/EditUserDropdown/EditUserDropdown";
import { HStack, VStack, styled } from "@/styled-system/jsx";
import { CheckIcon } from "@radix-ui/react-icons";
import { Badge, Heading, Table, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";



const StyledRow = styled(Table.Row)

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
                <Table.Root style={{width: '100%'}}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Employee Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Account Type</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Setup Complete</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Last Signed In</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Matches Found</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Open Opportunities</Table.ColumnHeaderCell>
                        </Table.Row>
                        {organization?.users && Object.values(organization.users).filter(user => user.userId !== session.user?.userId).map(user => (
                            <StyledRow key={user.userId}             
                                cursor='pointer' 
                                _hover={{bg: 'slate.4'}}
                            >
                                <Table.Cell>{user.userName}</Table.Cell>
                                <Table.Cell>{user.userEmail}</Table.Cell>
                                <Table.Cell>{user.userRole === 'admin' ? 'Admin' : 'Researcher'}</Table.Cell>
                                <Table.Cell><Badge><CheckIcon/>Complete</Badge></Table.Cell>
                                <Table.Cell>-</Table.Cell>
                                <Table.Cell>-</Table.Cell>
                                <Table.Cell>-</Table.Cell>
                            </StyledRow>
                        ))}
                    </Table.Header>
                </Table.Root> 
                
            </VStack>
        </VStack>
    )
}