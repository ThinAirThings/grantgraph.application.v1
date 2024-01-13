import { styled, HStack } from "@/styled-system/jsx";
import { FC, ReactNode } from "react";


export const NavigationButton: FC<{
    children: ReactNode
}> = ({
    children
}) => {
    return (
        <HStack px='2' py='1'>
            <InnerStyle data-selected>
                {children}
            </InnerStyle>
        </HStack>
    )
}

const InnerStyle = styled(HStack, {
    base: {
        backgroundColor: 'yellow',
        _selected: {
            backgroundColor: 'green'
        }
    }
})
