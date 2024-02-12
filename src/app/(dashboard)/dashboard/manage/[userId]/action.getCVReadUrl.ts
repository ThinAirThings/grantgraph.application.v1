'use server'
import { s3 } from "@/src/libs/aws/s3.client";
import { safeAction } from "@/src/libs/safe-action/utlities";
import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {z} from 'zod'


export const getCVReadUrlAction = safeAction(z.object({
    organizationId: z.string(),
    userId: z.string(),
}), async ({
    organizationId,
    userId,
}) => {
    // Check if cv already exists
    try {
        await s3.send(new HeadObjectCommand({
            Bucket: process.env.DOCUMENTS_BUCKET!,
            Key: `${organizationId}/${userId}/cv.pdf`,
        }));
        return {
            readUrl: await getSignedUrl(s3, new GetObjectCommand({
                Bucket: process.env.DOCUMENTS_BUCKET!,
                Key: `${organizationId}/${userId}/cv.pdf`,
            }), {
                expiresIn: 60*60*24*7
            })
        }
    } catch (_error) {
        const error = _error as Error & { name: string }
        if (error.name === 'NotFound') {
            return {
                readUrl: null
            }; // Object does not exist
        }
        throw error; // Other errors (e.g., permission issues, network problems)
    }
})