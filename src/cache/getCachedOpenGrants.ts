import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';
import { GrantEntry } from '../types/GrantEntry';


export const getCachedOpenGrants = cache(async () => (await dynamodb.scan({
    TableName: process.env.GRANTS_TABLE,
}))?.Items?.map(({
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
} as GrantEntry)), ['open-grants'], {
    revalidate: 60*60
})