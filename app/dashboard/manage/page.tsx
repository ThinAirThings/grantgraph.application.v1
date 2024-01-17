import { auth } from "@/app/libs/auth/auth";
import { VStack } from "@/styled-system/jsx";
import { Heading, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";



export default async function () {
    const session = await auth()
    if (!(session?.user?.role === 'admin')) {
        redirect('/dashboard')
    }
    return (
        <VStack alignItems='start' w='full'>
            <Heading>{`Welcome ${session?.user?.name?.split(' ')[0]}!`}</Heading>
            <VStack pl='3' gap='3' alignItems='start' w='full'>
                <Text color='gray' weight='bold'>Employee List</Text>
            </VStack>
        </VStack>
    )
}