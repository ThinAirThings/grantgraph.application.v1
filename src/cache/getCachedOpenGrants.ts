import { unstable_cache as cache } from 'next/cache';
import { StrippedGrantEntry } from '../types/GrantEntry';
import { getAllDynamodbItems } from '../libs/aws/dynamodb.getAll';


export const getCachedOpenGrants = cache(async () => (await getAllDynamodbItems(
    process.env.GRANTS_TABLE,
)).map(({
    grantId,
    title,
    agency,
    description,
    openDate,
    closeDate,
    opportunityNumber,
    grantSourceUrl,
    rawDescription,
    awardCeiling,
    awardFloor,
    awardEstimate
}) => ({
    grantId,
    title: title.text,
    agency: agency.text,
    description: description.text,
    opportunityNumber,
    openDate,
    closeDate,
    rawDescription,
    grantSourceUrl,
    awardCeiling,
    awardFloor,
    awardEstimate
} as StrippedGrantEntry)), ['open-grants'], {
    revalidate: 60*60*12
})