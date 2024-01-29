import { unstable_cache as cache, revalidateTag } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';


export const getCachedSavedGrantIds = cache(async ({
    organizationId,
    userId
}: {
    organizationId: string,
    userId: string
}) => {
    const item = (await dynamodb.get({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        },
    })).Item as {
        savedGrantIds?: string[],
    }
    return [...item.savedGrantIds??[]]
}, ['saved-grant-ids'], {
    tags: ['saved-grant-ids'],
    revalidate: 10
})