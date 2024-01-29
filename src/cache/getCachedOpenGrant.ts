import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';
import { StrippedGrantEntry } from '../types/GrantEntry';

export const getCachedOpenGrant = cache(async (grantId: string): Promise<StrippedGrantEntry> => {
    const {Item} = (await dynamodb.get({
        TableName: process.env.GRANTS_TABLE,
        Key: {grantId},
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
}, ['open-grant'], {
    revalidate: 60*60
})
