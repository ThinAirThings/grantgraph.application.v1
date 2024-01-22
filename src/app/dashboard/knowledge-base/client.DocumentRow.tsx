'use client'
import { styled } from "@/styled-system/jsx";
import { Table } from "@radix-ui/themes";
import { FC } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { DocumentTypeBadge } from "./client.DocumentTypeBadge";


const StyledRow = styled(Table.Row)
export const DocumentRow: FC<{
    documentId: string
    documentName: string
    documentType: 'application/pdf'
}> = ({
    documentId,
    documentName,
    documentType,
}) => {
    const router = useRouter()
    return (
        <StyledRow          
            cursor='pointer'
            _hover={{bg: 'slate.4'}}
            onClick={() => router.push(`/dashboard/knowledge-base/${documentId}`)}
        >
            <Table.Cell>{documentName}</Table.Cell>
            <Table.Cell><DocumentTypeBadge documentType={documentType}/></Table.Cell>
            <Table.Cell>
                <ChevronRightIcon/>
            </Table.Cell>
        </StyledRow>
    )
}