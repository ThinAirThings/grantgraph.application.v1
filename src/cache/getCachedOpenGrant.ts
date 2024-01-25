import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';
import { GrantEntry } from '../types/GrantEntry';
import { EmbeddedText } from '../types/EmbeddedText';

export const getCachedOpenGrant = cache(async (grantId: string) => {
    const grantData =  ((await dynamodb.get({
        TableName: process.env.GRANTS_TABLE,
        Key: {
            grantId
        }
    }))!.Item as {
        grantId: string,
        title: EmbeddedText,
        agency: EmbeddedText,
        description: EmbeddedText,
        openDate: string,
        closeDate: string,
        metadata: {
            opportunityNumber: string
        },
        details: {
            rawDescription: string,
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
        description: grantData.description,
        closeDate: grantData.closeDate,
        agency: grantData.agency,
        rawDescription: grantData.details.rawDescription,
        grantSourceUrl: grantData.details.grantSourceUrl,
        awardCeiling: grantData.financials.awardCeiling,
        awardFloor: grantData.financials.awardFloor,
        awardEstimate: grantData.financials.awardEstimate
    } as GrantEntry
}, ['open-grant'], {
    revalidate: 60*60
})
