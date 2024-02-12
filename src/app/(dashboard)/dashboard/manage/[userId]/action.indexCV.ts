'use server'
import { safeAction } from "@/src/libs/safe-action/utlities";
import {z} from 'zod'
import { lambda } from "@/src/libs/aws/lambda.client";
import { InvokeCommand } from "@aws-sdk/client-lambda";

export const indexCVAction = safeAction(z.object({
    organizationId: z.string(),
    userId: z.string(),
}), async ({
    organizationId,
    userId,
}) => {
    // Find Matches
    await lambda.send(new InvokeCommand({
        FunctionName: process.env.INDEXRESEARCHERCV_LAMBDA_ARN,
        InvocationType: 'Event',
        Payload: JSON.stringify({
            organizationId,
            userId
        })
    }))
})