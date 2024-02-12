import { HStack, VStack } from "@/styled-system/jsx"
import { Heading, Table } from "@radix-ui/themes"
import { redirect } from "next/navigation"


import { auth } from "@/src/libs/auth/auth";
import { CreateDocumentButton } from "./client.CreateDocumentButton";
import { DocumentRow } from "./client.DocumentRow";
import { getCachedDocuments } from "@/src/cache/getCachedDocuments";

export type DocumentEntry = {
    documentId: string
    documentName: string
    documentType: 'application/pdf'
}


export default async function () {
    const session = await auth()
    if (!(session?.user?.role === 'user')) {
        redirect('/dashboard')
    }
    const documents = await getCachedDocuments(session?.user?.userId)
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


