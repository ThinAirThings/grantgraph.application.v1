'use client'
import { FormButton } from "@/app/components/FormButton"
import { FormField } from "@/app/components/FormField"
import * as Form from "@radix-ui/react-form"
import { Box, Button, Dialog, Flex } from "@radix-ui/themes"



export const CreateOrganizationDialog = () => {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Box><Button size='1'>+ Create Organization</Button></Box>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Create New Organization</Dialog.Title>
                <Flex direction={'column'} gap='3'>
                    <Form.Root>
                        <Flex direction={'column'} gap='1'>
                            <FormField label="Organization Name" type="text" fieldKey="organizationName" required={true}/>
                            <Flex gap='1' justify={'end'}>
                                <Box><FormButton size='1'>Create</FormButton></Box>
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