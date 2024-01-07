import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, PutCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from 'bcrypt';
import { adminLogin } from './adminLogin';
import { userLogin } from './userLogin';
import { redirect } from 'next/navigation';


const db = DynamoDBDocument.from(new DynamoDBClient({}))
export const {
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [
        Credentials({
            authorize: async (_credentials) => {
                const { email, password, _admin } = _credentials as {
                    email: string,
                    password: string,
                    _admin: string
                }
                const admin = _admin === 'true'
                // Handle Admin Login
                if (admin) {
                    return await adminLogin({email, password})
                        ? {
                            role: 'ggAdmin',
                            email,
                            id: email
                        } : null
                }
                // Handle User Login
                return await userLogin({email, password})
                    ? {
                        role: 'user',
                        email,
                        id: email
                    } : null
            }
        })
    ],
    callbacks: {
        // This only runs on sign in
        jwt: async (jwt) => {
            // Handle Admin Login
            if (jwt.user?.role) {
                jwt.token.email = jwt.user.id
                jwt.token.role = jwt.user.role
                return jwt.token
            }
            // Handle User Login
            return jwt.token
        },
        // This runs every time the auth() fn is called
        session: async ({session, token}) => {
            // Get user id from sub
            if (session.user && token.sub) {
                session.user.id = token.sub
                session.user.role = token.role as string
            }
            return session
        },

    }
}) 