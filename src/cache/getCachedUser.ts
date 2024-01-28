import { unstable_cache as cache } from 'next/cache';
import { dynamodb } from '../libs/aws/dynamodb.client';
import { GrantGraphUser } from '../types/GrantGraphUser';

export const getCachedUser = cache(async (
    organizationId: string,
    userId: string
) => {
    const user =  (await dynamodb.get({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        }
    }))!.Item
    delete user?.['password']
    return {
        ...user,
    } as GrantGraphUser
}, ['user'], {
    tags: ['user']
})

