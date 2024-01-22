import { HStack, VStack } from "@/styled-system/jsx";
import { EraserIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Text } from "@radix-ui/themes";
import { useAction } from "next-safe-action/hooks";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { deleteUserAction } from "./action.deleteUser";
import { LoadingButton } from "@/src/interface/LoadingButton/LoadingButton";



export const DeleteUserDialog: FC<{
    organizationId: string
    userId: string
    dialogState: [boolean, Dispatch<SetStateAction<boolean>>]
    setUpdateDialogOpen: Dispatch<SetStateAction<boolean>>
}> = ({
    organizationId,
    userId,
    dialogState: [open, setOpen],
    setUpdateDialogOpen
}) => {
    const {
        status: deleteStatus,
        execute: executeDelete
    } = useAction(deleteUserAction, {
        onSuccess: () => {
            setOpen(false)
            setUpdateDialogOpen(false)
        }
    })
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Content>
                <Dialog.Title>Delete User</Dialog.Title>
                <Dialog.Description weight={'bold'} color='red'>Are you sure you want to delete this user?</Dialog.Description>
                <VStack mt='2' gap='2' alignItems={'start'}>
                    <Text>This will delete all their data.</Text>
                    <HStack gap='2'>
                        <LoadingButton size='1' color='red'
                            isLoading={deleteStatus === 'executing'}
                            onClick={() => executeDelete({
                                organizationId,
                                userId
                            })}
                        ><TrashIcon/>Delete User</LoadingButton>
                        <Dialog.Close>
                            <Button size='1' >Cancel</Button>
                        </Dialog.Close>
                    </HStack>
                </VStack>
            </Dialog.Content>
        </Dialog.Root>
    )
}