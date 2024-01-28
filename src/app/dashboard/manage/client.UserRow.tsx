'use client'
import { GrantGraphUser } from "@/src/types/GrantGraphUser";
import { styled } from "@/styled-system/jsx";
import { Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FC } from "react";



const StyledRow = styled(Table.Row)


export const UserRow: FC<{
    user: GrantGraphUser
}> = ({
    user 
}) => {
    const router = useRouter()
    return (
        <StyledRow key={user.userId}             
            cursor='pointer' 
            _hover={{bg: 'slate.4'}}
            onClick={() => router.push(`/dashboard/manage/${user.userId}`)}
        >
            <Table.Cell>{user.userName}</Table.Cell>
            <Table.Cell>{user.userRole === 'admin' ? 'Admin' : 'Researcher'}</Table.Cell>
            <Table.Cell>{user.userEmail}</Table.Cell>
            <Table.Cell>{user.lastSignIn
                ?  new Date(user.lastSignIn).toLocaleDateString('en-US')
                : '-'
            }</Table.Cell>
            <Table.Cell>-</Table.Cell>
            <Table.Cell>-</Table.Cell>
        </StyledRow>
    )
}