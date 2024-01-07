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
    const entry = await db.get({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            email
        }
    })
    if (!entry.Item) return '/login?error=Invalid%20Credentials'
    const match = await bcrypt.compare(password, entry.Item.password)
    if (!match) return '/login?error=Invalid%20Credentials'
    // NOTE!!! id wont show up on auth
    return true
}