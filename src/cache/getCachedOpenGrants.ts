import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';


export const getCachedOpenGrants = cache(async () => (await dynamodb.scan({
    TableName: process.env.GRANTS_TABLE,
}))?.Items?.map(({
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
})), ['open-grants'], {
    revalidate: 60*60
})