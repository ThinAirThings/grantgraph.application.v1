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
                    admin: boolean
                }
                // Handle Admin Login
                if (admin) {
                    return await superadminLogin({email, password})
                        ? {
                            role: 'superadmin',
                            email,
                            id: email
                        } : null
                }
                // Handle User Login
                return await userLogin({email, password})
                    ? {
                        role: 'user', // Or admin
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
            if (session.user && token.sub && token.role) {
                session.user.id = token.sub
                session.user.role = token.role as string
            }
            return session
        },
    }
}) 