'use server'

import { AuthError } from "next-auth"
import { signIn } from "./auth"
import { redirect } from "next/navigation"
import { safeAction } from "../safe-action/utlities"
import {z} from 'zod'

export const signInAction = safeAction(z.object({
    email: z.string().email(),
    password: z.string(),
    admin: z.boolean()
}), async ({
    email,
    password,
    admin
}) => {
    try {
        await signIn('credentials', {
            email,
            password,
            admin
        })
    } catch(error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
    }
    admin 
        ? redirect('/superadmin/dashboard')
        : redirect('/dashboard')
})