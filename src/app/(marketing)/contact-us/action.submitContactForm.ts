'use server'

import {z} from 'zod'
import {v4 as uuidv4} from 'uuid'
import { safeAction } from '@/src/libs/safe-action/utlities'
import { dynamodb } from '@/src/libs/aws/dynamodb.client'

export const submitContactForm = safeAction(z.object({
    email: z.string(),
    message: z.string(),
}), async ({
    email,
    message
}) => {
    const formId = uuidv4()
    await dynamodb.put({
        TableName: process.env.CONTACTFORM_TABLE,
        Item: {
            formId,
            email,
            message
        }
    })
})