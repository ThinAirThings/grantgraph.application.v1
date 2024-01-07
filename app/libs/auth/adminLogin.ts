import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import bcrypt from 'bcrypt';


const db = DynamoDBDocument.from(new DynamoDBClient({}))
export const adminLogin = async ({
    email,
    password
}: {
    email: string,
    password: string
}) => {
    const entry = await db.get({
        TableName: process.env.ADMINS_TABLE,
        Key: {
            email
        }
    })
    if (!entry.Item) return false
    const match = await bcrypt.compare(password, entry.Item.password)
    if (!match) return false
    // if (!match) return '/admin/login?error=Invalid%20Credentials'
    // NOTE!!! id wont show up on auth
    return true
}