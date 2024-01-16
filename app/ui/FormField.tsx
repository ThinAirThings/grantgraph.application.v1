'use client'
import { FC } from "react";
import * as Form from "@radix-ui/react-form";
import { Text, TextField } from "@radix-ui/themes";
import { VStack } from "@/styled-system/jsx";
import { css } from "@/styled-system/css";

export const FormField: FC<{
    label: string
    fieldKey: string
    type: 'text' | 'password'
    required?: boolean
}> = ({
    label,
    fieldKey,
    type,
    required
}) => {
    return (
        <Form.Field name={fieldKey} asChild>
            <VStack gap='1' alignItems={'start'} w='full'>
                <Text weight='bold' size='2'>{label}:</Text>
                <TextField.Root className={css({w: 'full'})}>
                    <Form.Control asChild>
                        <TextField.Input
                            required={required}
                            type={type}
                            size='1'
                        />
                    </Form.Control>
                </TextField.Root>
            </VStack>
        </Form.Field>
    )
}