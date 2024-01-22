import { Heading, Text, Table } from "@radix-ui/themes";
import { CreateOrganizationDialog } from "../../../../api/organizations/client.CreateOrganizationDialog";
import { HStack, VStack, styled } from "@/styled-system/jsx";
import { unstable_cache as cache } from 'next/cache';
import { OrganizationRow } from "./[organizationId]/client.OrganizationRow";
import { dynamodb } from "@/src/libs/aws/dynamodb.client";


export type OrganizationEntry = {
    organizationId: string
    organizationName: string
    users: Record<string, {
        userId: string
        userName: string
        userEmail: string
        userRole: string,
        lastSignIn?: string
    }>
}
// const StyledScrollArea = styled(ScrollArea)
const getCachedOrganizations = cache(async () => (await dynamodb.scan({
    TableName: process.env.ORGANIZATIONS_TABLE,
    Limit: 20
})).Items?.reduce((organizationMap: Record<string, OrganizationEntry>, item) => {
    // Check if item already exists in the orgs array by comparing the organizationId
    // If it does, then return the orgs array as is.
    if (Object.keys(organizationMap).includes(item.organizationId)) {
        organizationMap[item.organizationId].users[item.userId] = {
            userId: item.userId,
            userName: item.userName,
            userEmail: item.userEmail,
            userRole: item.userRole,
        }
        return organizationMap
    }
    // If it doesn't, then append the item to the orgs array and return it.
    organizationMap[item.organizationId] = {
        organizationId: item.organizationId,
        organizationName: item.organizationName,
        users: {
            [item.userId]: {
                userId: item.userId,
                userName: item.userName,
                userEmail: item.userEmail,
                userRole: item.userRole,
            }
        }
    }
    return organizationMap
}, {}) as Record<string, OrganizationEntry>, ['organizations'], {
    tags: ['organizations'],
    revalidate: 5
})

export default async function () {
    const organizations = await getCachedOrganizations()
    return (
        <VStack alignItems='start' w='full'>
            <Heading mb='4'>Organizations</Heading>
            <VStack pl='3' gap='3' alignItems='start' w='full'>
                <HStack gap='3'>
                    <Text color='gray' weight='bold'>Organizations List</Text>
                    <CreateOrganizationDialog/>
                </HStack> 
                <Table.Root style={{width: '100%'}}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Organization Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Users</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Object.entries(organizations)?.map(([_, organizationEntry]) => (
                            <OrganizationRow
                                key={organizationEntry.organizationId}
                                {...organizationEntry}
                            />
                        ))}
                    </Table.Body>
                </Table.Root>
            </VStack>
        </VStack>
    )
}

