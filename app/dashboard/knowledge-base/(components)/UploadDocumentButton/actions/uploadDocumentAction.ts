'use server'

import { safeAction } from "@/app/libs/safe-action/utlities"
import { zfd } from 'zod-form-data'
import {v4 as uuidv4} from 'uuid'
import { s3 } from "@/app/libs/aws/s3.client"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { auth } from "@/app/libs/auth/auth"
import { dynamodb } from "@/app/libs/aws/dynamodb.client"
import { revalidateTag } from "next/cache"

export const uploadDocumentAction = safeAction(zfd.formData({
    file: zfd.file()
}), async ({
    file
}) => {
    const {
        organizationId,
        userId
    } = (await auth())!.user!
    const fileId = uuidv4()
    await s3.send(new PutObjectCommand({
        Bucket: process.env.PUBLICATIONS_BUCKET,
        Key: `${organizationId}/${userId}/${fileId}`,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type
    }))
    await dynamodb.put({
        TableName: process.env.PUBLICATIONS_TABLE,
        Item: {
            organizationId,
            userId,
            fileId,
            fileName: file.name,
            fileType: file.type,
            fileCreatedAt: new Date().toISOString(),
            fileStatus: 'indexing'
        }
    })
    revalidateTag('files') 
})