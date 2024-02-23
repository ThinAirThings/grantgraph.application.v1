'use server'
import { lambda } from "@/src/libs/aws/lambda.client"
import { safeAction } from "@/src/libs/safe-action/utlities"
import { InvokeCommand } from "@aws-sdk/client-lambda"
import {z} from 'zod'

export const getProfileSummary = safeAction(z.object({
    url: z.string()
}), async({
    url
}) => {
    console.log(url)
    // Find Matches
    const result = await lambda.send(new InvokeCommand({
        FunctionName: `arn:aws:lambda:us-east-1:584821610629:function:grantgraph-stack_v1_api-v1-extraction-POST-e310d69`,
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({
            url,
            extractionPrompt: `
You are an ai designed to address a person based on the information about them in the text they include.
Please return a brief summary back to the person addressing them directly.
For example:
"Hi! I can see you are..."
And then end with:
"Now, let's get to work and find you some funding opportunities!"
`
        })
    }))
    const summary = JSON.parse(JSON.parse(new TextDecoder().decode(result.Payload!)).body).message
    return summary
})

                                // You are an ai designed to extract information from images. 
                                // Your task is to interpret the information inside images to create a list of "Jobs that can be done."
                                // The images you receive will contain information relating to skillsets a person has and the task is to create a list of capabilitities for the person.
                                // This information will be used to help the person receive funding for their projects.
                                // Your output should be a list of capabilities that the person has in the format ["I can do X", "I can do Y", "I can do..."].