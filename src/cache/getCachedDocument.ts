import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from '@/src/libs/auth/auth';
import { dynamodb } from '@/src/libs/aws/dynamodb.client';
import { s3 } from '@/src/libs/aws/s3.client';
import { unstable_cache as cache } from 'next/cache';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { DocumentEntry } from "../app/(dashboard)/dashboard/knowledge-base/page";

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