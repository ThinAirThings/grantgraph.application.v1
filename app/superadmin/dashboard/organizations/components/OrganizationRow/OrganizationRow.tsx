'use client'

import { styled } from "@/styled-system/jsx"
import { Table } from "@radix-ui/themes"
import { FC } from "react"
import { OrganizationEntry } from "../../page"
import { useRouter } from "next/navigation"


export const OrganizationRow: FC<OrganizationEntry> = ({
    organizationId,
    organizationName,
    users
}) => {
    const router = useRouter()
    return (
        <StyledRow
            cursor='pointer' 
            _hover={{bg: 'slate.4'}}
            onClick={() => router.push(`/superadmin/dashboard/organizations/${organizationId}`)}
        >
            <Table.Cell>{organizationName}</Table.Cell>
            <Table.Cell>{Object.keys(users).length}</Table.Cell>
        </StyledRow>
    )
}


const StyledRow = styled(Table.Row)