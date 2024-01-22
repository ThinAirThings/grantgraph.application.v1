import { HStack, VStack, styled } from "@/styled-system/jsx"
import { Badge, Heading, Table, Text } from "@radix-ui/themes"
import { redirect } from "next/navigation"
import { unstable_cache as cache } from 'next/cache';
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { dynamodb } from "@/src/libs/aws/dynamodb.client";
import { auth } from "@/src/libs/auth/auth";
import { CreateDocumentButton } from "./client.CreateDocumentButton";
import { DocumentRow } from "./client.DocumentRow";

export type DocumentEntry = {
    documentId: string
    documentName: string
    documentType: 'application/pdf'
}

const getCachedDocuments = cache(async (userId: string) => (await dynamodb.query({
    TableName: process.env.DOCUMENTS_TABLE,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
        ':userId': userId
    }})).Items?.reduce((documents: Record<string, DocumentEntry>, item) => {
        documents[item.documentId] = {
            documentId: item.documentId,
            documentName: item.documentName,
            documentType: item.documentType,
        }
        return documents
    }
, {}), ['documents'], {
    tags: ['documents'],
    revalidate: 60,
})



export default async function () {
    const session = await auth()
    if (!(session?.user?.role === 'user')) {
        redirect('/dashboard')
    }
    const documents = await getCachedDocuments(session?.user?.userId)
    console.log(documents)
    return (
        <VStack alignItems='start' w='full'>
            <Heading>Your Knowledge Base</Heading>
            <VStack ml='3' w='full'>
                <HStack justify={'space-between'} w='full'>
                    <Heading color='gray' size='3'>Publications and Documents</Heading>
                    <CreateDocumentButton/>
                </HStack>
                <Table.Root style={{width: '100%'}}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Document Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Document Type</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {documents && Object.values(documents).map(document => (
                            <DocumentRow
                                key={document.documentId}
                                {...document}
                            />
                        ))}
                    </Table.Body>
                </Table.Root> 
            </VStack>
        </VStack>
    )
}


