'use server'
import { dynamodb } from "../../libs/aws/dynamodb.client"
import {z} from 'zod'
import { safeAction } from "../../libs/safe-action/utlities"
import { revalidateTag } from "next/cache"


export const deleteUserAction = safeAction(z.object({
    organizationId: z.string(),
    userId: z.string()
}), async ({
    organizationId,
    userId
}) => {
    await dynamodb.delete({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        }
    })
    revalidateTag('organization')
})