
'use server'

import {z} from 'zod'
import { revalidateTag } from "next/cache"
import { safeAction } from '../safe-action/utlities'
import { dynamodb } from '../aws/dynamodb.client'

export const updateUserAction = safeAction(z.object({
    organizationId: z.string(),
    userId: z.string(),
    userName: z.string(),
    userEmail: z.string().email(),
    userRole: z.enum(['user', 'admin']),
}), async ({
    organizationId,
    userId,
    userName,
    userEmail,
    userRole,
}) => {
    await dynamodb.update({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        },
        UpdateExpression: 'set userName = :userName, userEmail = :userEmail, userRole = :userRole',
        ExpressionAttributeValues: {
            ':userName': userName,
            ':userEmail': userEmail,
            ':userRole': userRole
        }
    })
    revalidateTag('organization')
})