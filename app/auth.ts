import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, PutCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from 'bcrypt';


const db = DynamoDBDocument.from(new DynamoDBClient({}))
export const {
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [
        Credentials({
            authorize: async (_credentials) => {
                const { email, password } = _credentials as {
                    email: string,
                    password: string
                }
                const entry = await db.get({
                    TableName: process.env.USERS_TABLE,
                    Key: {
                        email
                    }
                })
                if (!entry.Item) return null
                const match = await bcrypt.compare(password, entry.Item.password)
                if (!match) return null
                // NOTE!!! id wont show up on auth
                return {
                    email: entry.Item.email,
                    id: entry.Item.email
                }
            }
        })
    ]
})