'use server'
import { dynamodb } from "@/src/libs/aws/dynamodb.client";
import { safeAction } from "@/src/libs/safe-action/utlities";
import {z} from 'zod'


export const getCVIndexStateAction = safeAction(z.object({
    organizationId: z.string(),
    userId: z.string(),
}), async ({
    organizationId,
    userId,
}) => {
    return (await dynamodb.get({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        }
    })).Item?.cvIndexState
})