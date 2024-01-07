'use client'
import { FC } from "react";
import * as Form from "@radix-ui/react-form";
import { Flex, Text, TextField } from "@radix-ui/themes";

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
        <Form.Field name={fieldKey}>
            <Flex direction={'column'} gap='1'>
                <Text weight='bold' size='2'>{label}:</Text>
                <Form.Control asChild>
                    <TextField.Input
                        required={required}
                        type={type}
                        size='1'
                        className="w-full"
                    />
                </Form.Control>
            </Flex>
        </Form.Field>
    )
}