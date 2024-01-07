import { auth } from "@/app/libs/auth/auth"
import { Button, Flex, Text } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import {CubeIcon} from "@radix-ui/react-icons"


export default async function AdminDashboardAuthenticationCheck({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()
    if (!(session?.user?.role === 'ggAdmin')) {
        redirect('/admin/login')
    }
    return (
        <div className="grid grid-cols-[200px,1fr] gap-5 h-screen">
            <Flex direction='column' pt='5' className="border-r slate10">
                <Link href="/dashboard">
                    <Flex align={'center'} justify={'center'}>
                        <Image src="/assets/logos.grantgraph/logo.square.svg" alt="grantgraph-logo" width={75} height={75}/>
                    </Flex>
                </Link>
                <Flex mt='5' direction={'column'}>
                    <Link href="/admin/dashboard/organizations">
                        <Flex py='3' px='3' className="border-t border-b border-slate8" align='center' gap='3'>
                            <CubeIcon/><Text>Organizations</Text>
                        </Flex>
                    </Link>
                </Flex>
            </Flex>
            <Flex>
                {children}
            </Flex>
        </div>
    )
}