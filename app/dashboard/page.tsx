import { redirect } from "next/navigation"
import { auth } from "../libs/auth/auth"



export default async function () {
    const session = await auth()
    session?.user?.role === 'admin'
        ? redirect('/dashboard/manage')
        : session?.user?.role === 'user'
        ? redirect('/dashboard/home')
        : redirect('/login')
}