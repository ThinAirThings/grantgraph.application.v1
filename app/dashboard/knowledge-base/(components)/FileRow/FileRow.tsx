'use client'
import { styled } from "@/styled-system/jsx";
import { Table } from "@radix-ui/themes";
import { FC } from "react";
import { FileTypeBadge } from "../FileTypeBadge/FileTypeBadge";
import { FileStatusBadge } from "../FileStatusBadge/FileStatusBadge";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";


const StyledRow = styled(Table.Row)
export const FileRow: FC<{
    fileId: string
    fileName: string
    fileType: 'application/pdf' | 'application/msword'
    fileStatus: 'indexing' | 'ready'
}> = ({
    fileId,
    fileName,
    fileType,
    fileStatus
}) => {
    const router = useRouter()
    return (
        <StyledRow          
            cursor='pointer'
            _hover={{bg: 'slate.4'}}
            onClick={() => router.push(`/dashboard/knowledge-base/${fileId}`)}
        >
            <Table.Cell>{fileName}</Table.Cell>
            <Table.Cell><FileTypeBadge fileType={fileType}/></Table.Cell>
            <Table.Cell><FileStatusBadge fileStatus={fileStatus}/></Table.Cell>
            <Table.Cell>
                <ChevronRightIcon/>
            </Table.Cell>
        </StyledRow>
    )
}