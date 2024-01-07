import { auth } from "@/app/libs/auth/auth";
import { LoginForm } from "@/app/components/LoginForm/LoginForm";
import { Flex } from "@radix-ui/themes";
import { redirect } from "next/navigation";



export default async function () {
    const session = await auth()
    console.log("SESSION")
    console.log(session)
    if (session?.user?.role === 'ggAdmin') {
        redirect('/admin/dashboard')
    }
    return (
        <Flex justify={'center'} align='center' className="h-screen">
            <LoginForm admin={true}/>
        </Flex>
    )
}