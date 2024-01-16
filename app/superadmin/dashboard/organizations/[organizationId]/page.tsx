import { HStack, VStack } from "@/styled-system/jsx";
import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from "@/app/libs/aws/dynamodb.client";
import { OrganizationEntry } from "../page";
import { Heading, Table } from "@radix-ui/themes";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";


const getCachedOrganization = cache(async (organizationId: string) => (await dynamodb.query({
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
            userEmail: item.userEmail
        }
        return organization
    }
    organization.organizationId = item.organizationId
    organization.organizationName = item.organizationName
    organization.users = {
        [item.userId]: {
            userId: item.userId,
            userName: item.userName,
            userEmail: item.userEmail
        }
    }
    return organization
}, {} as OrganizationEntry), ['organization'], {
    // tags: ['organization'],
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
            </HStack>
            <Table.Root style={{width: '100%'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>User Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>User Email</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>User Role</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table.Root>
        </VStack>
    )
}