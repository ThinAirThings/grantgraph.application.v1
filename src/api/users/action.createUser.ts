'use server'



import {z} from 'zod'
import {v4 as uuidv4} from 'uuid'
import { revalidateTag } from "next/cache"
import bcrypt from 'bcrypt'
import { safeAction } from '@/src/libs/safe-action/utlities'
import { dynamodb } from '@/src/libs/aws/dynamodb.client'

export const createUserAction = safeAction(z.object({
    organizationId: z.string(),
    organizationName: z.string(),
    userName: z.string(),
    userEmail: z.string().email(),
    userRole: z.enum(['user', 'admin']),
    password: z.string()
}), async ({
    organizationId,
    organizationName,
    userName,
    userEmail,
    userRole,
    password
}) => {
    const userId = uuidv4()
    password = await bcrypt.hash(password, 10)

    await dynamodb.put({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Item: {
            organizationId,
            userId,
            organizationName,
            userName: userName,
            userEmail: userEmail,
            userRole: userRole,
            password: password
        }
    })
    revalidateTag('organization')
})