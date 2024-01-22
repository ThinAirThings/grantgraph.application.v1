import { Badge } from "@radix-ui/themes"
import { FC } from "react"
import { DocumentEntry } from "./page"



export const DocumentTypeBadge: FC<{
    documentType: DocumentEntry['documentType']
}> = ({
    documentType
}) => {

    return (
        <Badge
            radius='medium'
            size='1' 
            color={
                documentType === 'application/pdf'
                ? 'yellow'
                : 'blue'
            }
        >{
            documentType === 'application/pdf'
            ? 'PDF'
            : 'DOC'
        }</Badge>
    )
}