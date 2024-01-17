'use client'
import { Badge } from "@radix-ui/themes";
import { FC } from "react";
import { FileEntry } from "../../page";
import { styled } from "@/styled-system/jsx";
import { RotatingLines } from "react-loader-spinner";



const StyledRotatingLines = styled(RotatingLines)
export const FileStatusBadge: FC<{
    fileStatus: FileEntry['fileStatus']
}> = ({
    fileStatus
}) => {

    return (
        <Badge
            radius='medium'
            size='1' 
            color={
                fileStatus === 'indexing'
                ? 'orange'
                : 'green'
            }
        >{
            fileStatus === 'indexing'
                ? (<>
                    {/* <RotatingLines
                        strokeColor="var(--orange-10)"
                        width={'12'}
                    />  */}
                    Indexing
                </>): 'Ready'
        }</Badge>
    )
}