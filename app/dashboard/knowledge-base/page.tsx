import { auth } from "@/app/libs/auth/auth"
import { HStack, VStack, styled } from "@/styled-system/jsx"
import { Badge, Heading, Table, Text } from "@radix-ui/themes"
import { redirect } from "next/navigation"
import { UploadDocumentButton } from "./(components)/UploadDocumentButton/UploadDocumentButton"
import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from "@/app/libs/aws/dynamodb.client"
import { FileTypeBadge } from "./(components)/FileTypeBadge/FileTypeBadge"
import { FileStatusBadge } from "./(components)/FileStatusBadge/FileStatusBadge"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { FileRow } from "./(components)/FileRow/FileRow"

export type FileEntry = {
    fileId: string
    fileName: string
    fileType: 'application/pdf' | 'application/msword'
    fileStatus: 'indexing' | 'ready'
}
const getCachedFiles = cache(async (userId: string) => (await dynamodb.query({
    TableName: process.env.PUBLICATIONS_TABLE,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
        ':userId': userId
    }})).Items?.reduce((files: Record<string, FileEntry>, item) => {
        files[item.fileId] = {
            fileId: item.fileId,
            fileName: item.fileName,
            fileType: item.fileType,
            fileStatus: item.fileStatus,
        }
        return files
    }
, {}), ['files'], {
    tags: ['files']
})



export default async function () {
    const session = await auth()
    if (!(session?.user?.role === 'user')) {
        redirect('/dashboard')
    }
    const files = await getCachedFiles(session?.user?.userId)
    return (
        <VStack alignItems='start' w='full'>
            <Heading>Your Knowledge Base</Heading>
            <VStack ml='3' w='full'>
                <HStack justify={'space-between'} w='full'>
                    <Heading color='gray' size='3'>Publications and Documents</Heading>
                    <UploadDocumentButton/>
                </HStack>
                <Table.Root style={{width: '100%'}}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>File Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>File Type</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>File Status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {files && Object.values(files).map(file => (
                            <FileRow
                                key={file.fileId}
                                {...file}
                            />
                        ))}
                    </Table.Body>
                </Table.Root> 
            </VStack>
        </VStack>
    )
}


