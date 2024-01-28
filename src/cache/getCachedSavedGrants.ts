import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';
import { getCachedSavedGrantIds } from './getCachedSavedGrantIds';
import { GrantEntry } from '../types/GrantEntry';


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
        description,
        openDate,
        closeDate,
        metadata: {
            opportunityNumber
        },
        details: {
            grantSourceUrl,
            rawDescription,
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
        description,
        rawDescription,
        grantSourceUrl,
        awardCeiling,
        awardFloor,
        awardEstimate
    } as GrantEntry))
}, ['saved-grants'], {
    tags: ['saved-grants'],
})