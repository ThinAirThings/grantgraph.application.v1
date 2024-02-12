import { redirect } from "next/navigation";
import { VStack } from "@/styled-system/jsx";
import { auth } from "@/src/libs/auth/auth";
import { LoginForm } from "@/src/components/LoginForm/LoginForm";

export default async function () {
    const session = await auth()
    if (session?.user?.role === 'superadmin') {
        redirect('/superadmin/dashboard')
    }
    return (
        <VStack justify={'center'} alignItems={'center'} w='full' h='screen'>
            <LoginForm admin={true}/>
        </VStack>
    )
}