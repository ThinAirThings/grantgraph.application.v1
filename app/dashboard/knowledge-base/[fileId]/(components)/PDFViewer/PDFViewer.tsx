'use client'

import { pdfjs } from 'react-pdf';
import { FC, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Button, Card, Flex, Heading, Inset, Text } from '@radix-ui/themes';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export const PDFViewer: FC<{
    pdfFileUrl: string
}> = ({
    pdfFileUrl
}) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset: number) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        <Flex direction={'column'} ml='3'>
            <Heading size='4' color='gray'>PDF Preview</Heading>
            <Card style={{width: '612px', height: '792px'}}>
                <Inset>
                    <Document
                        file={pdfFileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                </Inset>
            </Card>
            <Flex justify={'between'} align='end'>
                <Text>Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</Text>
                <Flex gap='3' mt='2'>
                    <Button 
                        size='1'
                        type='button'
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                    >Previous</Button>
                    <Button
                        size='1'
                        type='button'
                        disabled={pageNumber >= numPages!}
                        onClick={nextPage}
                    >Next</Button>
                </Flex>
            </Flex>
        </Flex>
  );
}