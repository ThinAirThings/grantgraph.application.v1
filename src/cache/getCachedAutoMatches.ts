import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';
import { StrippedGrantEntry } from '../types/GrantEntry';


export const getCachedAutoMatches = cache(async ({
    organizationId,
    userId
}: {
    organizationId: string,
    userId: string
}) => {
    const researcherActiveMatches = (await dynamodb.get({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        },
        ProjectionExpression: 'activeMatches',
    })).Item!.activeMatches as {
        fundingId: string
        grantId: string
        percentMatch: number
        reason: string
    }[]
    const matchedGrants = await Promise.all(researcherActiveMatches.map(async ({grantId, reason, percentMatch}) => {
        try {
            return {
                matchReason: reason,
                percentMatch,
                ...((await dynamodb.get({
                    TableName: process.env.GRANTS_TABLE,
                    Key: {
                        grantId
                    },
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
                    }})
                ).Item! as StrippedGrantEntry)
            } as StrippedGrantEntry & {
                matchReason: string
                percentMatch: number
            }
        } catch (e) {
            console.log(e)
            return null
        }
    }))

    return matchedGrants.filter(grant => grant !== null) as (StrippedGrantEntry & {
        matchReason: string
        percentMatch: number
    })[]
}, ['auto-matches'], {
    tags: ['auto-matches'],
    revalidate: 1
})