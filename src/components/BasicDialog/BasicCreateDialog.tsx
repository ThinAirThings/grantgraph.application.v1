'use client'
import { Box, Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { SafeAction } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { FC, useState } from "react";
import * as Form from "@radix-ui/react-form"
import { FormField } from "../../interface/FormField/FormField";
import { getStringError, submitExecution } from "@/src/libs/safe-action/utlities";
import { LoadingButton } from "@/src/interface/LoadingButton/LoadingButton";


export const BasicCreateDialog: FC<{
    title: string
    buttonLabel: string
    action: SafeAction<any, any>
    fields: {
        label: string
        type: 'text' | 'password'
        fieldKey: string
        required: boolean
    }[],
    additionalArgs?: Record<string, any>
}> = ({
    title,
    buttonLabel,
    action,
    fields,
    additionalArgs
}) => {
    const [open, setOpen] = useState(false)
    const {
        reset: resetCreate,
        status: createStatus,
        result: createResult,
        execute: executeCreate
    } = useAction(action, {
        onSuccess: () => {
            setOpen(false)
        }
    })
    return (
        <Dialog.Root open={open} onOpenChange={(openValue) => {
            if (!openValue) {
                resetCreate()
            }
            setOpen(openValue)
        }}>
            <Dialog.Trigger>
                <Box><Button size='1'>{buttonLabel}</Button></Box>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>{title}</Dialog.Title>
                <Flex direction={'column'} gap='3'>
                    <Form.Root onSubmit={(event) => submitExecution(event, executeCreate, additionalArgs)}>
                        <Flex direction={'column'} gap='1'>
                            {fields.map(field => <FormField {...field}/>)}
                            <Flex gap='1' justify={'end'}>
                                <Box><LoadingButton isLoading={createStatus === "executing"} size='1'>Create</LoadingButton></Box>
                                <Dialog.Close>
                                    <Box><Button size='1' color='red'>Cancel</Button></Box>
                                </Dialog.Close>
                            </Flex>
                            <Flex justify={'end'}>
                                {(createResult.validationErrors || createResult.serverError) 
                                    && <Text color='red'>{getStringError(createResult)}</Text>
                                }
                            </Flex>
                        </Flex>
                    </Form.Root>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}