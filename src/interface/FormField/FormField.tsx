'use client'
import { FC, forwardRef } from "react";
import * as Form from "@radix-ui/react-form";
import { Text, TextField } from "@radix-ui/themes";
import { VStack } from "@/styled-system/jsx";
import { css } from "@/styled-system/css";


export const FormField = forwardRef<
HTMLInputElement, {
    label: string
    fieldKey: string
    type: 'text' | 'password'
    defaultValue?: string
    placeholder?: string
    required?: boolean
}>(({
    label,
    fieldKey,
    type,
    defaultValue,
    placeholder,
    required
}, ref) => {
    return (
        <Form.Field name={fieldKey} asChild>
            <VStack gap='1' alignItems={'start'} w='full'>
                <Text weight='bold' size='2'>{label}:</Text>
                <TextField.Root className={css({w: 'full'})}>
                    <Form.Control ref={ref} asChild>
                        <TextField.Input
                            required={required}
                            type={type}
                            defaultValue={defaultValue}
                            size='1'
                            placeholder={placeholder}
                        />
                    </Form.Control>
                </TextField.Root>
            </VStack>
        </Form.Field>
    )
})