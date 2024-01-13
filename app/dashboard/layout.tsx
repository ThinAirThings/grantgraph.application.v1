import { redirect } from "next/navigation"
import { auth } from "../libs/auth/auth"
import { ReactNode } from "react"
import { css } from "@/styled-system/css"
import { Sidebar } from "./components/Sidebar"
import { VStack } from "@/styled-system/jsx"

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
        <div className={css({
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            height: 'screen',
        })}>
            <Sidebar/>
            <VStack>
                {children}
            </VStack>
        </div>
    )
}