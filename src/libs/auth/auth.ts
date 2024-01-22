import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { superadminLogin } from './superadminLogin';
import { userLogin } from './userLogin';

export const {
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const { email, password, admin } = credentials as {
                    email: string,
                    password: string,
                    admin: string
                }

                // Handle Admin Login
                if (admin === 'true') {
                    return await superadminLogin({email, password})
                        ? {
                            role: 'superadmin',
                            email,
                            id: email,
                            userId: email,
                            organizationId: 'superadmin'
                        } : null
                }
                // Handle User Login
                return await userLogin({email, password})
            }
        })
    ],
    callbacks: {
        // This only runs on sign in
        jwt: async (jwt) => {
            // Handle Admin Login
            if (jwt.user?.role) {
                jwt.token.name = jwt.user.name
                jwt.token.email = jwt.user.email
                jwt.token.role = jwt.user.role
                jwt.token.organizationId = jwt.user.organizationId
                return jwt.token
            }
            // Handle User Login
            return jwt.token
        },
        // This runs every time the auth() fn is called
        session: async ({session, token}) => {
            // Get user id from sub
            if (session.user && token.sub && token.role) {
                session.user.organizationId = token.organizationId as string
                session.user.name = token.name as string
                session.user.userId = token.sub
                session.user.role = token.role as string
            }
            return session
        },
    }
}) 