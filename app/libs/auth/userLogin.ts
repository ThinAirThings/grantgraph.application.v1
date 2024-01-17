import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import bcrypt from 'bcrypt';


const db = DynamoDBDocument.from(new DynamoDBClient({}))
export const userLogin = async ({
    email,
    password
}: {
    email: string,
    password: string
}) => {
    const entry = await db.query({
        TableName: process.env.ORGANIZATIONS_TABLE,
        IndexName: 'userEmail-index',
        KeyConditionExpression: 'userEmail = :userEmail',
        ExpressionAttributeValues: {
            ':userEmail': email
        }
    })
    if (!entry.Items?.[0]) return null
    const match = await bcrypt.compare(password, entry.Items[0].password)
    if (!match) return null
    // NOTE!!! id wont show up on auth
    return {
        name: entry.Items[0].userName,
        role: entry.Items[0].userRole,
        email: entry.Items[0].userEmail,
        id: entry.Items[0].userId,
        userId: entry.Items[0].userId,
        organizationId: entry.Items[0].organizationId
    }
}