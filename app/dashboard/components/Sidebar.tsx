import { Button, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { FC } from "react";
import { NavigationButton } from "./NavigationButton";
import { css } from "@/styled-system/css";
import { VStack } from "@/styled-system/jsx";



export const Sidebar:FC<{

}> = ({

}) => {
    return (
        <VStack py='40'>
            <VStack direction={'column'}>
                <Image
                    src="/assets/logos.grantgraph/logo.square.svg"
                    width={75}
                    height={75}
                    alt='grantgraph-logo'
                    className={css({
                        marginBottom: '32px'
                    })}
                />
                <VStack>
                    <NavigationButton>Dashboard</NavigationButton>
                </VStack>
            </VStack>
        </VStack>
    )
}

