'use server'
import { unstable_cache as cache } from 'next/cache';
import { getCachedOpenGrant } from './getCachedOpenGrant';
import { getCachedOpenGrants } from './getCachedOpenGrants';
import { GrantMatch } from '../types/GrantMatch';


export const getCachedSimilarGrants = cache(async (grantId: string) => {
    const grantData = await getCachedOpenGrant(grantId)
    const maxSimilarity = grantData.similarGrants.reduce((max, {similarity}) => Math.max(max, similarity), 0)
    console.log(maxSimilarity)
    return (await getCachedOpenGrants(
        ...grantData.similarGrants.map(({grantId}) => grantId)
    )).map(grant => ({
        ...grant,
        percentMatch: grantData.similarGrants.find(({grantId: similarGrantId}) => 
            similarGrantId === grant.grantId
        )!.similarity / maxSimilarity
    })) as GrantMatch[]
}, ['similar-grants'], {
    revalidate: 60*60
})