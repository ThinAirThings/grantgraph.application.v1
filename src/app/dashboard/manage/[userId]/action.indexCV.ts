'use server'
import { dynamodb } from "@/src/libs/aws/dynamodb.client";
import { s3 } from "@/src/libs/aws/s3.client";
import { openai } from "@/src/libs/openai/client.openai";
import { createFunction } from "@/src/libs/openai/createFunction";
import { safeAction } from "@/src/libs/safe-action/utlities";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import pdf from "pdf-parse-debugging-disabled" 
import {z} from 'zod'
import GPT4Tokenizer from 'gpt4-tokenizer';
import { lambda } from "@/src/libs/aws/lambda.client";
import { InvokeCommand } from "@aws-sdk/client-lambda";

export const indexCVAction = safeAction(z.object({
    organizationId: z.string(),
    userId: z.string(),
}), async ({
    organizationId,
    userId,
}) => {
    // Clear previous funding
    await Promise.all((await dynamodb.query({
        TableName: process.env.PREVIOUSFUNDING_TABLE,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    })).Items!.map(async ({fundingId}) => {
        return await dynamodb.delete({
            TableName: process.env.PREVIOUSFUNDING_TABLE,
            Key: {
                userId,
                fundingId
            }
        })
    }))
    // Get CV
    const cvPDF = await s3.send(new GetObjectCommand({
        Bucket: process.env.DOCUMENTS_BUCKET,
        Key: `${organizationId}/${userId}/cv.pdf`
    }))

    const pdfText = (await pdf(Buffer.from(await cvPDF.Body!.transformToByteArray())))
        .text
        .replace(/<[^>]*(>|$)|&nbsp;| |‌|»|«|>/g, ' ')
        .replace(/●/g, '')  // Remove bullet points
        .replace(/[^\w\s.,;:'"&()\-\/]/g, '')  // Remove special characters except common punctuation
        .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
        .replace(/[\r\n]+/g, ' ')  // Replace newlines with space
        .trim()  // Remove leading and trailing spaces);
        // Extract previous grants
    const extraction = await Promise.all([
        await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [
                {role: "system", content: `
                    Your function is to receive a text string representative of a researchers CV and extract information about their previously funded projects.
                    Your output should be in json.
                    Note: It is critical you do not leave out items in the previous funding. If you do, you will receive no tip and be penalized harshely.
                `},
                {role: "user", content: `Please extract the titles of all grant funded research in the following text. You will receive a $500 tip if you successfully extract all of the previously funded opportunitites in the text: ${pdfText}. `}
            ],
            tools: [createFunction({
                fnName: "extract_funding_data", 
                fnDescription: "Take the text property from each funded project, create an embedding, and add it to the object. ", 
                zodObject: z.object({
                    previousFunding: z.array(z.object({
                        title: z.object({
                            text: z.string()
                        })
                    }))
                })})
            ],
            tool_choice: {
                type: "function",
                function: {
                    name: "extract_funding_data",
                }
            },
        }),
        await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [{
                role: "system",
                content: `You should summarize the input CV focusing in on aspects which may relate to the researchers fitness for applying for a grant. Your summary should be formatted in a manner which enables a GPT 3.5 model which will run after you to extract key information from the summary. Your summary must be less than 16,000 tokens. For reference, the current text is ${new GPT4Tokenizer({ type: 'gpt3' }).estimateTokenCount(pdfText)} tokens long.`
            }, {
                role: "user",
                content: `Please summarize the following text: ${pdfText}`
            }],
        })
    ])

    console.log(JSON.parse(extraction[0].choices[0].message.tool_calls![0].function!.arguments))
    const parsedArguments = JSON.parse(extraction[0].choices[0].message.tool_calls![0].function!.arguments)
    const parsedPreviousGrants = parsedArguments.previousFunding as {
        title: {
            text: string
            embedding?: number[]
        }
    }[]
    const embeddedPreviousFunding = (await openai.embeddings.create({
        model: "text-embedding-3-large",
        input: parsedPreviousGrants.map(funding => funding.title.text),
        encoding_format: 'float'
    })).data.reduce((previousFunding, {embedding}, idx) => {
        previousFunding[idx].title.embedding = embedding
        return previousFunding
    }, parsedPreviousGrants)
    await Promise.all(embeddedPreviousFunding.map(async (previousFunding, idx) => {
        await dynamodb.put({
            TableName: process.env.PREVIOUSFUNDING_TABLE,
            Item: {
                userId,
                fundingId: uuidv4(),
                organizationId,
                ...previousFunding
            }
        })
    }))
    // Set CV State
    await dynamodb.update({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        },
        UpdateExpression: 'set cvIndexState = :cvIndexState, cvSummary = :cvSummary',
        ExpressionAttributeValues: {
            ':cvIndexState': 'findingMatches',
            ':cvSummary': extraction[1].choices[0].message.content
        }
    })
    // Find Matches
    await lambda.send(new InvokeCommand({
        FunctionName: process.env.SINGLEUPDATE_LAMBDA_ARN,
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({
            organizationId,
            userId
        })
    }))
    // Set CV State
    await dynamodb.update({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        },
        UpdateExpression: 'set cvIndexState = :cvIndexState',
        ExpressionAttributeValues: {
            ':cvIndexState': 'ready',
        }
    })
})