import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';

export const getCachedOpenGrant = cache(async (grantId: string) => {
    const grantData =  ((await dynamodb.get({
        TableName: process.env.GRANTS_TABLE,
        Key: {
            grantId
        }
    }))!.Item as {
        grantId: string,
        title: string,
        agency: string,
        openDate: string,
        closeDate: string,
        metadata: {
            opportunityNumber: string
        },
        details: {
            rawDescription: string,
            embedding: number[],
            grantSourceUrl: string
        },
        financials: {
            awardCeiling: string,
            awardFloor: string,
            awardEstimate: string
        }
    })
    return {
        grantId: grantData.grantId,
        title: grantData.title,
        opportunityNumber: grantData.metadata.opportunityNumber,
        openDate: grantData.openDate,
        closeDate: grantData.closeDate,
        agency: grantData.agency,
        rawDescription: grantData.details.rawDescription,
        embedding: grantData.details.embedding,
        grantSourceUrl: grantData.details.grantSourceUrl,
        awardCeiling: grantData.financials.awardCeiling,
        awardFloor: grantData.financials.awardFloor,
        awardEstimate: grantData.financials.awardEstimate
    }
}, ['open-grant'], {
    revalidate: 60*60
})
