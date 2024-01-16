'use server'

import { dynamodb } from "@/app/libs/aws/dynamodb.client"
import { safeAction } from "@/app/libs/safe-action/utlities"
import {z} from 'zod'
import {v4 as uuidv4} from 'uuid'
import { revalidateTag } from "next/cache"

export const createOrganizationAction = safeAction(z.object({
    organizationName: z.string(),
    adminName: z.string(),
    adminEmail: z.string().email(),
}), async ({
    organizationName,
    adminName,
    adminEmail
    }) => {
    const organizationId = uuidv4()
    const userId = uuidv4()
    await dynamodb.put({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Item: {
            organizationId,
            userId,
            organizationName,
            userName: adminName,
            userEmail: adminEmail,
            userRole: 'admin'
        }
    })
    revalidateTag('organizations')
})