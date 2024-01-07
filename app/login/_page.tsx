
import { redirect } from "next/navigation"
import { Card, Flex} from "@radix-ui/themes"
import Image from "next/image"


export default async function () {
    // const session = await auth()
    // if (session?.user) {
    //     redirect('/dashboard')
    // }
    return (
        <Flex justify={'center'} align='center' className="h-screen">
            <Card className="w-[392px] p-10">
                <Flex className="flex flex-col justify-start items-center gap-5">
                    <Image src="/assets/logos.blueprint/blueprint-logo-fullText.svg" width={250} height={100} alt="logo" />
                </Flex>
            </Card>
        </Flex>
    )
}