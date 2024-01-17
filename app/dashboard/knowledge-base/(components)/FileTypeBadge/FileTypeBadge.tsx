import { Badge } from "@radix-ui/themes"
import { FC } from "react"
import { FileEntry } from "../../page"



export const FileTypeBadge: FC<{
    fileType: FileEntry['fileType']
}> = ({
    fileType
}) => {

    return (
        <Badge
            radius='medium'
            size='1' 
            color={
                fileType === 'application/pdf'
                ? 'yellow'
                : 'blue'
            }
        >{
            fileType === 'application/pdf'
            ? 'PDF'
            : 'DOC'
        }</Badge>
    )
}