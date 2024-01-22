

'use server'

import {z} from 'zod'
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { revalidateTag } from "next/cache"
import { safeAction } from '@/src/libs/safe-action/utlities'
import { auth } from '@/src/libs/auth/auth'
import { s3 } from '@/src/libs/aws/s3.client'
import { dynamodb } from '@/src/libs/aws/dynamodb.client'

export const deleteDocumentAction = safeAction(z.object({
    documentId: z.string()
}), async ({
    documentId
}) => {
    const {
        organizationId,
        userId
    } = (await auth())!.user!
    await s3.send(new DeleteObjectCommand({
        Bucket: process.env.PUBLICATIONS_BUCKET,
        Key: `${organizationId}/${userId}/${documentId}`,
    }))

    await dynamodb.delete({
        TableName: process.env.PUBLICATIONS_TABLE,
        Key: {
            userId,
            documentId
        }
    })
    revalidateTag('documents') 
})