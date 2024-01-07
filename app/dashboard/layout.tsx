import { redirect } from "next/navigation"
import { auth } from "../libs/auth/auth"
import { Button, Flex } from "@radix-ui/themes"
import Link from "next/link"
import { ReactNode } from "react"


export default async function ({
    children
}: {
    children: ReactNode
}) {
    // Check Authentication
    const session = await auth()
    if (!session?.user) {
        redirect('/login')
    }
    return (
        <div className="grid grid-cols-[200px,1fr] gap-5 h-screen">
            <Flex direction='column' p='5' className="border-r slate10">
                
            </Flex>
            <Flex>
                {children}
            </Flex>
        </div>
    )
}