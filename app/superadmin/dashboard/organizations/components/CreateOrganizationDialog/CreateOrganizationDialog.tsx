'use client'
import { FormButton } from "@/app/ui/FormButton"
import { FormField } from "@/app/ui/FormField"
import * as Form from "@radix-ui/react-form"
import { Box, Button, Dialog, Flex } from "@radix-ui/themes"
import { useAction } from "next-safe-action/hooks"
import { useState } from "react"
import { createOrganizationAction } from "./actions/createOrganizationAction"
import { submitExecution } from "@/app/libs/safe-action/utlities"
import { LoadingButton } from "@/app/ui/LoadingButton/LoadingButton"



export const CreateOrganizationDialog = () => {
    const [open, setOpen] = useState(false)
    const {
        status: createOrganizationStatus,
        result: createOrganizationResult,
        execute: executeCreateOrganization
    } = useAction(createOrganizationAction, {
        onSuccess: () => {
            setOpen(false)
        }
    })
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <Box><Button size='1'>+ Create Organization</Button></Box>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Create New Organization</Dialog.Title>
                <Flex direction={'column'} gap='3'>
                    <Form.Root onSubmit={(event) => submitExecution(event, executeCreateOrganization)}>
                        <Flex direction={'column'} gap='1'>
                            <FormField label="Organization Name" type="text" fieldKey="organizationName" required={true}/>
                            <FormField label="Admin Name" type="text" fieldKey="adminName" required={true}/>
                            <FormField label="Admin Email" type="text" fieldKey="adminEmail" required={true}/>
                            <Flex gap='1' justify={'end'}>
                                <Box><LoadingButton isLoading={createOrganizationStatus === "executing"} size='1'>Create</LoadingButton></Box>
                                <Dialog.Close>
                                    <Box><Button size='1' color='red'>Cancel</Button></Box>
                                </Dialog.Close>
                            </Flex>
                        </Flex>
                    </Form.Root>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}