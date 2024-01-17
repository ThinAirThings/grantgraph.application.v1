
import { auth } from '@/app/libs/auth/auth';
import { dynamodb } from '@/app/libs/aws/dynamodb.client';
import { unstable_cache as cache } from 'next/cache';
import { FileEntry } from '../page';
import { s3 } from '@/app/libs/aws/s3.client';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { HStack, VStack } from '@/styled-system/jsx';
import Link from 'next/link';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Heading } from '@radix-ui/themes';
import { file } from 'zod-form-data';
import { PDFViewer } from './(components)/PDFViewer/PDFViewer';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getCachedFile = cache(async(fileId: string) => {
    const {
        organizationId,
        userId
    } = (await auth())!.user!
    const fileData = (await dynamodb.get({
        TableName: process.env.PUBLICATIONS_TABLE,
        Key: {
            userId,
            fileId
        }
    })).Item as FileEntry

    const fileUrl = await getSignedUrl(s3, new GetObjectCommand({
        Bucket: process.env.PUBLICATIONS_BUCKET,
        Key: `${organizationId}/${userId}/${fileId}`
    }), {
        expiresIn: 60 * 5
    })
    return {
        ...fileData,
        fileUrl
    }
}, ['file'], {
    tags: ['file'],
    revalidate: 60
})

export default async function ({
    params
}: {
    params: {
        fileId: string
    }
}) {
    const fileObject = await getCachedFile(params.fileId)
    return (
        <VStack alignItems='start' w='full'>
            <HStack gap='2'>
                <Link href="/dashboard/knowledge-base">
                    <ChevronLeftIcon transform="scale(1.8)"/>
                </Link>
                <Heading>{fileObject.fileName}</Heading>
            </HStack>
            <PDFViewer pdfFileUrl={fileObject.fileUrl}/>
        </VStack>
    )
}