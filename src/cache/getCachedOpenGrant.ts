import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';
import { GrantEntry, StrippedGrantEntry } from '../types/GrantEntry';
import { EmbeddedText } from '../types/EmbeddedText';

export const getCachedOpenGrant = cache(async (grantId: string): Promise<StrippedGrantEntry> => {
    const grantData =  ((await dynamodb.get({
        TableName: process.env.GRANTS_TABLE,
        Key: {
            versionId: 'v1.openai.large',
            grantId
        }
    }))!.Item as {
        grantId: string,
        title: EmbeddedText,
        agency: EmbeddedText,
        description: EmbeddedText,
        openDate: string,
        closeDate: string,
        opportunityNumber: string
        rawDescription: string,
        grantSourceUrl: string
        awardCeiling: string,
        awardFloor: string,
        awardEstimate: string
    })
    return {
        grantId: grantData.grantId,
        title: grantData.title.text,
        opportunityNumber: grantData.opportunityNumber,
        openDate: grantData.openDate,
        description: grantData.description.text,
        closeDate: grantData.closeDate,
        agency: grantData.agency.text,
        rawDescription: grantData.rawDescription,
        grantSourceUrl: grantData.grantSourceUrl,
        awardCeiling: grantData.awardCeiling,
        awardFloor: grantData.awardFloor,
        awardEstimate: grantData.awardEstimate
    }
}, ['open-grant'], {
    revalidate: 60*60
})
