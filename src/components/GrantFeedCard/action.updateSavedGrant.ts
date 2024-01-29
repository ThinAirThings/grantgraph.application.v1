'use server'
import { auth } from "@/src/libs/auth/auth";
import { dynamodb } from "@/src/libs/aws/dynamodb.client";
import { safeAction } from "@/src/libs/safe-action/utlities";
import { revalidateTag } from "next/cache";
import { z } from "zod";


export const updateSavedGrantAction = safeAction(z.object({
    grantId: z.string(),
    saved: z.boolean()
}), async ({
    grantId,
    saved
}) => {
    const {organizationId, userId} = (await auth())?.user!
    await dynamodb.update({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        },
        UpdateExpression: saved ? 'ADD savedGrantIds :grantId' : 'DELETE savedGrantIds :grantId',
        ExpressionAttributeValues: {
            ':grantId': new Set([grantId])
        }
    })
    revalidateTag('saved-grant-ids')
    return {
        saved
    }
})