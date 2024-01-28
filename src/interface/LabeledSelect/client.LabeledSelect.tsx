'use client'

import { Flex, Select, Text } from "@radix-ui/themes"
import { ChangeEventHandler, HTMLAttributes, forwardRef } from "react"



export const LabeledSelect = forwardRef<
HTMLSelectElement, {
    label: string
    options: {
        label: string
        value: string
    }[]
    defaultValue?: string
    onChange?: (value: string) => void
    value?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>>(({
    label,
    options,
    defaultValue,
    onChange,
    value,
    ...props
}, ref) => {
    return (
        <Flex direction={'column'} {...props}>
            <Text weight='medium'>{label}</Text>
            <Select.Root 
                defaultValue={defaultValue}
                value={value}
                onValueChange={onChange}
            >
                <Select.Trigger />
                <Select.Content>
                    {options.map(option => <Select.Item key={option.value} value={option.value}>{option.label}</Select.Item>)}
                </Select.Content>
            </Select.Root>
        </Flex>
    )
})

