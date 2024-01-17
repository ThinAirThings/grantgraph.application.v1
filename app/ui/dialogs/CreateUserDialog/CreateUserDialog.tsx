


'use client'
import { Box, Button, Dialog, Flex, Select, Text } from "@radix-ui/themes";
import { SafeAction } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { FC, useRef, useState } from "react";
import * as Form from "@radix-ui/react-form"
import { getStringError, submitExecution } from "@/app/libs/safe-action/utlities";
import { FormField } from "../../FormField";
import { LoadingButton } from "../../LoadingButton/LoadingButton";
import { createUserAction } from "@/app/libs/shared-actions/createUserAction";
import {v4 as uuidv4} from 'uuid'
import { VStack } from "@/styled-system/jsx";

const fields = [{
    fieldKey: 'userName',
    label: `The User's Name`,
    required: true,
    type: 'text'
}, {
    fieldKey: 'userEmail',
    label: `The User's Email`,
    required: true,
    type: 'text'
}] satisfies {
    fieldKey: string
    label: string
    type: 'text' | 'password'
    required: boolean
}[]

export const CreateUserDialog: FC<{
    organizationId: string
    organizationName: string
}> = ({
    organizationId,
    organizationName
}) => {
    const [open, setOpen] = useState(false)
    const {
        reset: resetCreate,
        status: createStatus,
        result: createResult,
        execute: executeCreate
    } = useAction(createUserAction, {
        onSuccess: () => {
            setOpen(false)
        }
    })
    const passwordInputRef = useRef<HTMLInputElement>(null)
    return (
        <Dialog.Root open={open} onOpenChange={(openValue) => {
            if (!openValue) {
                resetCreate()
            }
            setOpen(openValue)
        }}>
            <Dialog.Trigger>
                <Box><Button size='1'>+ Create User</Button></Box>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Create User</Dialog.Title>
                <Flex direction={'column'} gap='3'>
                    <Form.Root onSubmit={(event) => submitExecution(event, executeCreate, {
                        organizationId,
                        organizationName
                    })}>
                        <Flex direction={'column'} gap='1'>
                            {fields.map(field => <FormField key={field.fieldKey} {...field}/>)}
                            <Form.Field name={'userRole'} asChild>
                                <Flex gap='1' direction={'column'}>
                                    <Text size='2' weight='bold'>The User's Role</Text>
                                    <Form.Control asChild>
                                        <Select.Root defaultValue="user">
                                            <Select.Trigger/>
                                            <Select.Content>
                                                <Select.Item value="user">User</Select.Item>
                                                <Select.Item value="admin">Admin</Select.Item>
                                            </Select.Content>
                                        </Select.Root>
                                    </Form.Control>
                                </Flex>
                            </Form.Field>
                            <Flex gap='2'>
                                <FormField
                                    ref={passwordInputRef}
                                    fieldKey='password'
                                    label={`The User's Password (They can change this later)`}
                                    placeholder='yourOwnPassword123'
                                    required={true}
                                    type='text'
                                />
                                <Button size='1' style={{alignSelf: 'end'}} 
                                    type='button'
                                    onClick={() => {
                                        if (passwordInputRef.current) {
                                            passwordInputRef.current.value = uuidv4()
                                        }
                                    }}
                                >Generate</Button>
                            </Flex>
                            <Text size='1'>Make sure you save this, you won't be able to see it again.</Text>
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