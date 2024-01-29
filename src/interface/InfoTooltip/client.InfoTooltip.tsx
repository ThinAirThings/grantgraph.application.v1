'use client'

import { InfoCircledIcon } from "@radix-ui/react-icons"
import { IconButton, Tooltip } from "@radix-ui/themes"
import { FC } from "react"


export const InfoTooltip: FC<{
    content: string
}> = ({
    content
}) => {
    return (
        <Tooltip content={content}>
            <IconButton size='1' variant='ghost' color='gray'>
                <InfoCircledIcon/>
            </IconButton>
        </Tooltip>
    )
}