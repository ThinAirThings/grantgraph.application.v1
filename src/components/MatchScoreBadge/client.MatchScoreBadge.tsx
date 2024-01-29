'use client'

import { BarChartIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import { Badge, Box, IconButton, Text, Tooltip } from "@radix-ui/themes"
import { FC } from "react"


export const MatchScoreBadge: FC<{
    percentMatch: number
}> = ({
    percentMatch
}) => {
    return (
        <Badge color='green' radius='full' >
            <BarChartIcon/>
            <Text mt='1'>{Math.round(percentMatch*100)}</Text>
            <Tooltip content="Internal score representing how strong of a match this grant is.">
                <Box mx='2' style={{marginTop: '1px'}}>
                    <IconButton
                        size='1' 
                        radius='small'
                        variant='ghost'
                        color='gray'
                    ><InfoCircledIcon width={15} height={15}/></IconButton>
                </Box>
            </Tooltip>
        </Badge>
    )
}