'use server'

import {z} from 'zod'
import { safeAction } from "@/src/libs/safe-action/utlities";
import { revalidateTag } from "next/cache";
import { lambda } from "@/src/libs/aws/lambda.client";
import { InvokeCommand } from "@aws-sdk/client-lambda";

export const updateResearcherMatchesAction = safeAction(z.object({
    organizationId: z.string(),
    userId: z.string(),
}), async ({
    organizationId,
    userId,
}) => {
    // Set CV State
    const response = await lambda.send(new InvokeCommand({
        FunctionName: process.env.SINGLEUPDATE_LAMBDA_ARN,
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({
            organizationId,
            userId
        })
    }))
    revalidateTag('user')
    return JSON.parse(new TextDecoder().decode(response.Payload!))
})