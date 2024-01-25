'use server'

import { getCachedOpenGrants } from "@/src/cache/getCachedOpenGrants"
import { openai } from "@/src/libs/openai/client.openai"
import { safeAction } from "@/src/libs/safe-action/utlities"
import { calculateMeanVector } from "@/src/libs/vectors/calculateMeanVector"
import { cosineSimilarity } from "@/src/libs/vectors/cosineSimilarity"
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
    const grantEmbeddings = await getCachedOpenGrants()
    const queryEmbedding = calculateMeanVector((await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: [...searchQueries.values()].map(({query}) => query)
    })).data.map(({embedding}) => embedding))
    return grantEmbeddings?.map((grant) => ({
        ...grant,
        similarity: cosineSimilarity(queryEmbedding, grant.description.embedding)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 20)
})


