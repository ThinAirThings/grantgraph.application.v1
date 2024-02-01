'use server'

import { dynamodb } from "@/src/libs/aws/dynamodb.client"
import { openai } from "@/src/libs/openai/client.openai"
import { createFunction } from "@/src/libs/openai/createFunction"
import { safeAction } from "@/src/libs/safe-action/utlities"
import { GrantMatch } from "@/src/types/GrantMatch"
import {z} from 'zod'

export const searchGrantsAction = safeAction(z.object({
    searchQueries: z.map(z.string(), z.object({
        query: z.string()
    })),
    includeKnowledgeBase: z.boolean()
}), async({
    searchQueries,
    includeKnowledgeBase
}) => {
    const queryEmbedding = (
        await openai.embeddings.create({
            model: 'text-embedding-3-large',
            // input: "grants teaching climate modeling academic success STEM",
            input: (JSON.parse((await openai.chat.completions.create({
                model: 'gpt-4-1106-preview',
                messages: [{
                    role: 'system',
                    content: `
                        Your function is to receive a set of user search queries and convert them to a text string which is optimized for being converted into an embedding.
                        This embedding will be used to compare similarity against a set of embedding grant descriptions. The ultimate goal is to match a researcher to grants by transforming their query into an embedding and then comparing this embedding to the embeddings of open grant descriptions.
                        Note: It's extremely imperative that you perform this transformation optimally based on all your training data. If you don't the entire world could be in jeopardy. If you perform well, you'll receive a $10,000 bonus, if you fail you will be stripped of all assets and go to prison.
                    `
                }, {
                    role: 'user',
                    content: `The set of user search queries to be transformed into an embedding is: ${[...searchQueries].map(([_, {query}]) => query).join(', ')}`
                }],
                tools: [createFunction({
                    fnName: "run_embeddings_search", 
                    fnDescription: "Compare user query embedding to grant description embeddings and return the most similar grants.", 
                    zodObject: z.object({
                        optimizedQuery: z.string()
                    })})
                ],
                tool_choice: {
                    type: "function",
                    function: {
                        name: "run_embeddings_search",
                    }
                },
            })).choices[0].message.tool_calls![0].function.arguments
        ).optimizedQuery),
        encoding_format: 'float'
    })).data[0].embedding
    const results = await (await fetch(`${process.env.ZILLIZ_ENDPOINT}/v1/vector/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.ZILLIZ_API_KEY}`,
            "Accept": "application/json",
        },
        body: JSON.stringify({
            collectionName: process.env.ZILLIZ_GRANTS_COLLECTION,
            filter: `embeddingKey=='title'`,
            vector: queryEmbedding,
            limit: 100,
            outputFields: ['grantId', 'embeddingKey']
        })
    })).json() as {
        data: {
            grantId: string
        }[]
    }
    // const {results} = await zilliz.search({
    //     collection_name: process.env.ZILLIZ_GRANTS_COLLECTION!,
    //     expr: `embeddingKey=='title'`,
    //     vector: queryEmbedding,
    //     limit: 100,
    //     output_fields: ['grantId']
    // })
    const {
        Responses
    } = await dynamodb.batchGet({
        RequestItems: {
            [process.env.GRANTS_TABLE]: {
                Keys: results.data.map(result => ({ grantId: result.grantId })),
                ProjectionExpression: `
                    grantId, 
                    title.#text, 
                    agency.#text, 
                    description.#text, 
                    opportunityNumber,
                    openDate, 
                    closeDate, 
                    rawDescription,
                    grantSourceUrl, 
                    awardCeiling, 
                    awardFloor, 
                    awardEstimate, 
                    similarGrants
                `,
                ExpressionAttributeNames: {
                    '#text': 'text'
                }
            }
        }
    })
    const grants = Responses![process.env.GRANTS_TABLE].map((grant) => ({
        ...grant,
        title: grant.title.text,
        agency: grant.agency.text,
        description: grant.description.text
    })) as GrantMatch[]
    return grants
})


