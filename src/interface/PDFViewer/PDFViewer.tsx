'use client'

import { pdfjs } from 'react-pdf';
import { FC, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Button, Card, Flex, Heading, Inset, ScrollArea, Text } from '@radix-ui/themes';
import { RotatingLines } from 'react-loader-spinner';
import { VStack } from '@/styled-system/jsx';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export const PDFViewer: FC<{
    pdfDocumentUrl: string,
    heightOffset?: number
}> = ({
    pdfDocumentUrl,
    heightOffset
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
        <Flex direction={'column'} style={{maxHeight: '100%', width: 'fit-content'}}>
            <Heading size='4' color='gray' >PDF Preview</Heading>
            <ScrollArea type="always" scrollbars="vertical" style={{height: `calc(100vh - ${heightOffset??175}px)`}}>
                <Flex direction={'column'} style={{maxHeight: '100%'}} pr='4'>
                    <Card style={{width: '612px', height: '792px'}}>
                        <Inset>
                            <Document
                                file={pdfDocumentUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={<VStack w='full' h='792px' alignItems={'center'} justify='center'>
                                    <RotatingLines
                                        width='54'
                                        strokeWidth="3"
                                        strokeColor='gray'
                                    />
                                </VStack>}
                            >
                                <Page pageNumber={pageNumber} />
                            </Document>
                        </Inset>
                    </Card>
                </Flex>
            </ScrollArea>
            <Flex justify={'between'} align='end' style={{maxHeight: '100%'}} >
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