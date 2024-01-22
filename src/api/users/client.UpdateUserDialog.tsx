import { HStack, VStack } from "@/styled-system/jsx"
import { Button, Dialog, Flex, Select, Text } from "@radix-ui/themes"
import { Dispatch, FC, SetStateAction } from "react"
import { FormField } from "../../interface/FormField/FormField"
import * as Form from "@radix-ui/react-form"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { useAction } from "next-safe-action/hooks"
import { updateUserAction } from "./action.updateUser"
import { submitExecution } from "@/src/libs/safe-action/utlities"
import { LoadingButton } from "@/src/interface/LoadingButton/LoadingButton"


export const UpdateUserDialog: FC<{
    organizationId: string
    userId: string
    userName: string
    userEmail: string
    userRole: string
    dialogState: [boolean, Dispatch<SetStateAction<boolean>>]
    setDeleteDialogOpen: Dispatch<SetStateAction<boolean>>
}> = ({
    organizationId,
    userId,
    userName,
    userEmail,
    userRole,
    dialogState: [open, setOpen],
    setDeleteDialogOpen
}) => {
    const {
        reset: resetUpdate,
        status: updateStatus,
        result: updateResult,
        execute: executeUpdate
    } = useAction(updateUserAction, {
        onSuccess: () => {
            setOpen(false)
        }
    })
    return (
        <Dialog.Root open={open} onOpenChange={(openValue) => {
            if (!openValue) {
                resetUpdate()
            }
            setOpen(openValue)
        }}>
            <Dialog.Content>
                <Dialog.Title>Edit User Information</Dialog.Title>
                <Flex mt='2' gap='3' direction={'column'}>
                    <Form.Root onSubmit={(event) => {
                        submitExecution(event, executeUpdate, {
                            organizationId,
                            userId
                        })
                    }}>
                        <Flex direction={'column'} gap='1'>
                            <FormField fieldKey='userName' label={`The User's Name`} type='text' required={true} defaultValue={userName}/>
                            <FormField fieldKey='userEmail' label={`The User's Email`} type='text' required={true} defaultValue={userEmail}/>
                            <Form.Field name={'userRole'} asChild>
                                <Flex gap='1' direction={'column'}>
                                    <Text size='2' weight='bold'>The User's Role</Text>
                                    <Form.Control asChild>
                                        <Select.Root defaultValue={userRole} size='1'>
                                            <Select.Trigger/>
                                            <Select.Content>
                                                <Select.Item value="user">User</Select.Item>
                                                <Select.Item value="admin">Admin</Select.Item>
                                            </Select.Content>
                                        </Select.Root>
                                    </Form.Control>
                                </Flex>
                            </Form.Field>
                        </Flex>
                        <Flex gap='2' mt='3' justify={'between'}>
                            <Button size='1' color='red'
                                type='button'
                                onClick={() => setDeleteDialogOpen(true)}
                            >Delete</Button>
                            <Flex justify={'end'} gap='2'>
                                <LoadingButton isLoading={updateStatus === 'executing'} size='1' type='submit'><Pencil2Icon/>Save</LoadingButton>
                                <Dialog.Close>
                                    <Button size='1' type='button' variant="outline" color='red'>Cancel</Button>
                                </Dialog.Close>
                            </Flex>
                        </Flex>
                    </Form.Root>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}