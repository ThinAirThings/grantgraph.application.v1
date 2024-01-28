'use server'
import { s3 } from "@/src/libs/aws/s3.client";
import { safeAction } from "@/src/libs/safe-action/utlities";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {z} from 'zod'


export const getCVUploadUrlAction = safeAction(z.object({
    organizationId: z.string(),
    userId: z.string(),
}), async ({
    organizationId,
    userId,
}) => {
    return {
        createUrl: await getSignedUrl(s3, new PutObjectCommand({
            Bucket: process.env.DOCUMENTS_BUCKET!,
            Key: `${organizationId}/${userId}/cv.pdf`,
            ContentType: 'application/pdf',
        }), {
            expiresIn: 60
        }),
        readUrl: await getSignedUrl(s3, new GetObjectCommand({
            Bucket: process.env.DOCUMENTS_BUCKET!,
            Key: `${organizationId}/${userId}/cv.pdf`,
        }), {
            expiresIn: 60
        })
    }
})