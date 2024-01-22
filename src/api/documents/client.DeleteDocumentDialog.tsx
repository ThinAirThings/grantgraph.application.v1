'use client'


import { HStack, VStack } from "@/styled-system/jsx";
import { TrashIcon } from "@radix-ui/react-icons";
import { Box, Button, Dialog } from "@radix-ui/themes";
import { useAction } from "next-safe-action/hooks";
import { FC, useState } from "react";
import { LoadingButton } from "@/src/interface/LoadingButton/LoadingButton";
import { deleteDocumentAction } from "./action.deleteDocument";
import { useRouter } from "next/navigation";


export const DeleteDocumentDialog: FC<{
    documentId: string
}> = ({
    documentId,
}) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const {
        status: deleteStatus,
        execute: executeDelete
    } = useAction(deleteDocumentAction, {
        onSuccess: () => {
            setOpen(false)
            router.push('/dashboard/knowledge-base')
        }
    })
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <Box><Button color='red' variant='outline'><TrashIcon/>Delete Document</Button></Box>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Delete Document</Dialog.Title>
                <Dialog.Description weight={'bold'} color='red'>Are you sure you want to delete this document?</Dialog.Description>
                <VStack mt='2' gap='2' alignItems={'start'}>
                    <HStack gap='2'>
                        <LoadingButton size='1' color='red'
                            isLoading={deleteStatus === 'executing'}
                            onClick={() => executeDelete({
                                documentId
                            })}
                        ><TrashIcon/>Delete Document</LoadingButton>
                        <Dialog.Close>
                            <Button size='1' >Cancel</Button>
                        </Dialog.Close>
                    </HStack>
                </VStack>
            </Dialog.Content>
        </Dialog.Root>
    )
}