import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import bcrypt from 'bcrypt';


const db = DynamoDBDocument.from(new DynamoDBClient({}))
export const superadminLogin = async ({
    email,
    password
}: {
    email: string,
    password: string
}) => {
    const entry = await db.get({
        TableName: process.env.SUPERADMINS_TABLE,
        Key: {
            email
        }
    })
    if (!entry.Item) return false
    const match = await bcrypt.compare(password, entry.Item.password)
    if (!match) return false
    return true
}