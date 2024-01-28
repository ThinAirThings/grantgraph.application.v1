'use client'

import { Flex, Text, TextField } from "@radix-ui/themes"
import { ChangeEvent, ChangeEventHandler, HTMLAttributes, forwardRef } from "react"


export const LabeledField = forwardRef<
HTMLInputElement, {
    label: string
    defaultValue?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    value?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>>(({
    label,
    defaultValue,
    onChange,
    value,
    ...props
}, ref) => {
    return (
        <Flex direction={'column'} {...props}>
            <Text weight='medium'>{label}</Text>
            <TextField.Input
                ref={ref} 
                defaultValue={defaultValue}
                onChange={onChange}
                value={value}
            />
        </Flex>
    )
})