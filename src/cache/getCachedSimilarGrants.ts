'use server'
import { unstable_cache as cache } from 'next/cache';
import { getCachedOpenGrant } from './getCachedOpenGrant';
import { getCachedOpenGrants } from './getCachedOpenGrants';
import { cosineSimilarity } from '../libs/vectors/cosineSimilarity';


export const getCachedSimilarGrants = cache(async (grantId: string) => {
    const grantData = await getCachedOpenGrant(grantId)
    const allGrantsData = await getCachedOpenGrants()
    return allGrantsData?.map((grant) => ({
        ...grant,
        similarity: cosineSimilarity(grantData.embedding, grant.embedding)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 21)
})