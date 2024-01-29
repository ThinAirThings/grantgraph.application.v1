import { HStack, VStack } from "@/styled-system/jsx";
import { unstable_cache as cache } from 'next/cache';
import { Heading, Table } from "@radix-ui/themes";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { dynamodb } from "@/src/libs/aws/dynamodb.client";
import { CreateUserDialog } from "@/src/api/users/client.CreateUserDialog";
import { EditUserDropdown } from "@/src/api/users/client.EditUserDropdown";
import { GrantGraphOrganization } from "@/src/types/GrantGraphOrganization";
import { GrantGraphUser } from "@/src/types/GrantGraphUser";


export const getCachedOrganization = cache(async (organizationId: string) => ((await dynamodb.query({
    TableName: process.env.ORGANIZATIONS_TABLE,
    KeyConditionExpression: 'organizationId = :organizationId',
    ExpressionAttributeValues: {
        ':organizationId': organizationId
    },
})).Items as GrantGraphUser[]).reduce((organization: GrantGraphOrganization, user: GrantGraphUser) => {
    if (organization.organizationId && organization.organizationName) {
        organization.users[user.userId] = {
            ...user,
        }
        return organization
    }
    organization.organizationId = user.organizationId
    organization.organizationName = user.organizationName
    organization.users = {
        [user.userId]: {
            ...user,
        }
    }
    return organization
}, {} as GrantGraphOrganization), ['organization'], {
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