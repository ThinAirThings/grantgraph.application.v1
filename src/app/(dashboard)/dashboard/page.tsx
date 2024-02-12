import { auth } from "@/src/libs/auth/auth"
import { redirect } from "next/navigation"



export default async function () {
    const session = await auth()
    session?.user?.role === 'admin'
        ? redirect('/dashboard/manage')
        : session?.user?.role === 'user'
        ? redirect('/dashboard/home')
        : redirect('/login')
}