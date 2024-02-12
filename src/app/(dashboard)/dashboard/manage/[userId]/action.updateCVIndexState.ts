'use server'

import { dynamodb } from "@/src/libs/aws/dynamodb.client"
import {z} from 'zod'
import { safeAction } from "@/src/libs/safe-action/utlities";
import { revalidateTag } from "next/cache";



export const updateCVIndexStateAction = safeAction(z.object({
    organizationId: z.string(),
    userId: z.string(),
    cvIndexState: z.enum(['indexing', 'ready'])
}), async ({
    organizationId,
    userId,
    cvIndexState
}) => {
    // Set CV State
    await dynamodb.update({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        },
        UpdateExpression: 'set cvIndexState = :cvIndexState',
        ExpressionAttributeValues: {
            ':cvIndexState': cvIndexState
        }
    })
    revalidateTag('user')
})
