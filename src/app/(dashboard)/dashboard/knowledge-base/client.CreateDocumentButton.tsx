'use client'
import { UploadIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { useDropzone } from "react-dropzone";
import { LoadingButton } from "@/src/interface/LoadingButton/LoadingButton";
import { createDocumentAction } from "@/src/api/documents/action.createDocument";


export const CreateDocumentButton: FC = () => {
    const {
        getInputProps,
        getRootProps,
        isFileDialogActive,
        acceptedFiles,
    } = useDropzone({
        onDrop: async (acceptedFiles) => {
            console.log("DROP")
            const formData = new FormData()
            formData.append('document', acceptedFiles[0])
            console.log(acceptedFiles[0])
            await createDocumentAction(formData)
        }
    })
    return (
        <>
            <input {...getInputProps()}/>
            <LoadingButton
                size='1'
                {...getRootProps()}
                isLoading={isFileDialogActive}
            ><UploadIcon/>Upload Documents</LoadingButton>
        </>
    )
}