
import { unstable_cache as cache } from 'next/cache';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { Grid, HStack, VStack } from '@/styled-system/jsx';
import Link from 'next/link';
import { ChevronLeftIcon, PersonIcon, TrashIcon } from '@radix-ui/react-icons';
import { Box, Button, Heading, ScrollArea } from '@radix-ui/themes';
import { PDFViewer } from '../../../../interface/PDFViewer/PDFViewer';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from '@/src/libs/auth/auth';
import { dynamodb } from '@/src/libs/aws/dynamodb.client';
import { s3 } from '@/src/libs/aws/s3.client';
import { DeleteDocumentDialog } from '@/src/api/documents/client.DeleteDocumentDialog';
import { DocumentEntry } from '../page';

export const getCachedDocument = cache(async(documentId: string) => {
    const {
        organizationId,
        userId
    } = (await auth())!.user!
    const documentData = (await dynamodb.get({
        TableName: process.env.DOCUMENTS_TABLE,
        Key: {
            userId,
            documentId
        }
    })).Item as DocumentEntry

    const documentUrl = await getSignedUrl(s3, new GetObjectCommand({
        Bucket: process.env.DOCUMENTS_BUCKET,
        Key: `${organizationId}/${userId}/${documentId}`
    }), {
        expiresIn: 60 * 60 * 24 * 7
    })
    return {
        ...documentData,
        documentUrl
    }
}, ['document'], {
    tags: ['document'],
    revalidate: 60,
})

export default async function ({
    params
}: {
    params: {
        documentId: string
    }
}) {
    const documentObject = await getCachedDocument(params.documentId)
    return (
        <VStack alignItems='start' w='full' maxHeight={'full'}>
            <HStack justify={'space-between'} w='full'>
                <HStack gap='2' >
                    <Link href="/dashboard/knowledge-base">
                        <ChevronLeftIcon transform="scale(1.8)"/>
                    </Link>
                    <Heading>{documentObject.documentName}</Heading>
                </HStack>
                <DeleteDocumentDialog
                    documentId={params.documentId}
                />
            </HStack>
            <Grid columns={2} maxHeight={'full'} >
                <Box></Box>
                <PDFViewer pdfDocumentUrl={documentObject.documentUrl}/>
            </Grid>
        </VStack>
    )
}