
import { redirect } from "next/navigation"
import { Flex } from "@radix-ui/themes"
import { LoginForm } from "../components/LoginForm/LoginForm"
import { auth } from "../libs/auth/auth"


export default async function () {
    const session = await auth()
    if (session?.user) {
        redirect('/dashboard')
    }
    return (
        <Flex justify={'center'} align='center' className="h-screen">
            <LoginForm admin={false}/>
        </Flex>
    )
}