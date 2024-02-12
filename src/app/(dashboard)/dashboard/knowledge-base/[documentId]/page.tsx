

import { Grid, HStack, VStack } from '@/styled-system/jsx';
import Link from 'next/link';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Box, Heading } from '@radix-ui/themes';
import { DeleteDocumentDialog } from '@/src/api/documents/client.DeleteDocumentDialog';
import { getCachedDocument } from '@/src/cache/getCachedDocument';
import { PDFViewer } from '@/src/interface/PDFViewer/PDFViewer';


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