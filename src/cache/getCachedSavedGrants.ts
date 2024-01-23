import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';
import { getCachedSavedGrantIds } from './getCachedSavedGrantIds';


export const getCachedSavedGrants = cache(async ({
    organizationId,
    userId
}: {
    organizationId: string,
    userId: string
}) => {
    const {savedGrantIds} = await getCachedSavedGrantIds({
        organizationId,
        userId
    })
    return (await dynamodb.batchGet({
        RequestItems: {
            [process.env.GRANTS_TABLE]: {
                Keys: savedGrantIds.map(grantId => ({ grantId }))
            }
        }
    })).Responses?.[process.env.GRANTS_TABLE]?.map(({
        grantId,
        title,
        agency,
        openDate,
        closeDate,
        metadata: {
            opportunityNumber
        },
        details: {
            grantSourceUrl,
            rawDescription,
            embedding
        },
        financials: {
            awardCeiling,
            awardFloor,
            awardEstimate
        }
    }) => ({
        grantId,
        title,
        opportunityNumber,
        openDate,
        closeDate,
        agency,
        rawDescription,
        embedding,
        grantSourceUrl,
        awardCeiling,
        awardFloor,
        awardEstimate
    }))
}, ['saved-grants'], {
    tags: ['saved-grants'],
})