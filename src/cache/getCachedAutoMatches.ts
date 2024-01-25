import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';
import { getCachedOpenGrants } from './getCachedOpenGrants';
import { cosineSimilarity } from '../libs/vectors/cosineSimilarity';
import { GrantEntry } from '../types/GrantEntry';



export const getCachedAutoMatches = cache(async ({
    organizationId,
    userId
}: {
    organizationId: string,
    userId: string
}): Promise<GrantEntry[]> => {
    const {
        embedding: researcherEmbedding,
    } = (await dynamodb.get({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        }
    })).Item!
    if (!researcherEmbedding) return []
    // Get Grant Embeddings
    const grantEmbeddings = await getCachedOpenGrants()
    // Calculate Similarity
    const matches = grantEmbeddings?.map((grant) => ({
        ...grant,
        similarity: cosineSimilarity(researcherEmbedding, grant.description.embedding)
    }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 20)
    return matches!
}, ['auto-matches'], {
    tags: ['auto-matches'],
})