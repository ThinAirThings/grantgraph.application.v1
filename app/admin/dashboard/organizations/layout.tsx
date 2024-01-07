import { Flex, Heading } from "@radix-ui/themes";
import { ReactNode } from "react";



export default function ({
    children
}: {
    children: ReactNode
}) {
    return (
        <Flex p='8' direction={'column'} className="w-full h-full">
            <Heading mb='3'>Organizations</Heading>
            {children}
        </Flex>
    )
}