import { unstable_cache as cache } from 'next/cache';
import { StrippedGrantEntry } from '../types/GrantEntry';
import { dynamodb } from '../libs/aws/dynamodb.client';

export const getCachedOpenGrants = cache(async (
    ...savedGrantIds: string[]
) => {
    return await Promise.all(savedGrantIds.map(async (grantId) => {
            const {Item} = (await dynamodb.get({
                TableName: process.env.GRANTS_TABLE,
                Key: { grantId },
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
            }))
            return {
                ...Item,
                title: Item!.title.text,
                agency: Item!.agency.text,
                description: Item!.description.text,
            } as StrippedGrantEntry
        }))
}, ['open-grants'], {
    revalidate: 60*60
})



// (await getAllDynamodbItems(
//     process.env.GRANTS_TABLE,
// )).map(({
//     grantId,
//     title,
//     agency,
//     description,
//     openDate,
//     closeDate,
//     opportunityNumber,
//     grantSourceUrl,
//     rawDescription,
//     awardCeiling,
//     awardFloor,
//     awardEstimate
// }) => ({
//     grantId,
//     title: title.text,
//     agency: agency.text,
//     description: description.text,
//     opportunityNumber,
//     openDate,
//     closeDate,
//     rawDescription,
//     grantSourceUrl,
//     awardCeiling,
//     awardFloor,
//     awardEstimate
// } as StrippedGrantEntry)), ['open-grants'], {
//     revalidate: 60*60
// })