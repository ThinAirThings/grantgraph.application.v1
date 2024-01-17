'use client'
import { FC, useState } from "react";
import { IconButton, DropdownMenu } from "@radix-ui/themes";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DeleteUserDialog } from "../../dialogs/DeleteUserDialog/DeleteUserDialog";
import { UpdateUserDialog } from "../../dialogs/UpdateUserDialog/UpdateUserDialog";


export const EditUserDropdown: FC<{
    organizationId: string
    userId: string
    userName: string
    userEmail: string
    userRole: string
}> = ({
    organizationId,
    userId,
    userName,
    userEmail,
    userRole
}) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false)
    return (
        <>
            <DeleteUserDialog 
                organizationId={organizationId}
                userId={userId}
                dialogState={[deleteDialogOpen, setDeleteDialogOpen]} 
                setUpdateDialogOpen={setUpdateDialogOpen}
            />
            <UpdateUserDialog
                organizationId={organizationId}
                userId={userId}
                userName={userName}
                userEmail={userEmail}
                userRole={userRole}
                dialogState={[updateDialogOpen, setUpdateDialogOpen]}
                setDeleteDialogOpen={setDeleteDialogOpen}
            />
            <DropdownMenu.Root >
                <DropdownMenu.Trigger>
                    <IconButton variant='ghost' size='1'><DotsHorizontalIcon/></IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item 
                        onSelect={() => setUpdateDialogOpen(true)}
                    >Edit</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item 
                        color='red'
                        onSelect={() => setDeleteDialogOpen(true)}
                    >Delete</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </>

    )
}