import { HStack, VStack } from "@/styled-system/jsx";
import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from "@/app/libs/aws/dynamodb.client";
import { OrganizationEntry } from "../page";
import { Heading, Table } from "@radix-ui/themes";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { CreateUserDialog } from "@/app/ui/dialogs/CreateUserDialog/CreateUserDialog";
import { EditUserDropdown } from "@/app/ui/dropdown-menus/EditUserDropdown/EditUserDropdown";


export const getCachedOrganization = cache(async (organizationId: string) => (await dynamodb.query({
    TableName: process.env.ORGANIZATIONS_TABLE,
    KeyConditionExpression: 'organizationId = :organizationId',
    ExpressionAttributeValues: {
        ':organizationId': organizationId
    },
})).Items?.reduce((organization: OrganizationEntry, item) => {
    if (organization.organizationId && organization.organizationName) {
        organization.users[item.userId] = {
            userId: item.userId,
            userName: item.userName,
            userEmail: item.userEmail,
            userRole: item.userRole
        }
        return organization
    }
    organization.organizationId = item.organizationId
    organization.organizationName = item.organizationName
    organization.users = {
        [item.userId]: {
            userId: item.userId,
            userName: item.userName,
            userEmail: item.userEmail,
            userRole: item.userRole
        }
    }
    return organization
}, {} as OrganizationEntry), ['organization'], {
    tags: ['organization'],
})


export default async function ({
    params
}: {
    params: {
        organizationId: string
    }
}) {
    const organization = await getCachedOrganization(params.organizationId)
    return (
        <VStack alignItems='start' w='full'>
            <HStack gap='2'>
                <Link href="/superadmin/dashboard/organizations">
                    <ChevronLeftIcon transform="scale(1.8)"/>
                </Link>
                <Heading>{organization?.organizationName}</Heading>
                <CreateUserDialog
                    organizationId={organization!.organizationId}
                    organizationName={organization!.organizationName}
                />
            </HStack>
            <Table.Root style={{width: '100%'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>User Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>User Email</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>User Role</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell/>
                    </Table.Row>
                    {organization?.users && Object.values(organization.users).map(user => (
                        <Table.Row key={user.userId}>
                            <Table.Cell>{user.userName}</Table.Cell>
                            <Table.Cell>{user.userEmail}</Table.Cell>
                            <Table.Cell>{user.userRole}</Table.Cell>
                            <Table.Cell>
                                <EditUserDropdown
                                    organizationId={organization.organizationId}
                                    userId={user.userId}
                                    userName={user.userName}
                                    userEmail={user.userEmail}
                                    userRole={user.userRole}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Header>
            </Table.Root>
        </VStack>
    )
}