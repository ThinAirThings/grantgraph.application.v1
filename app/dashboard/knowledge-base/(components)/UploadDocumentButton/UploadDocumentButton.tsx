'use client'
import { LoadingButton } from "@/app/ui/LoadingButton/LoadingButton";
import { UploadIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { useDropzone } from "react-dropzone";
import { uploadDocumentAction } from "./actions/uploadDocumentAction";


export const UploadDocumentButton: FC = () => {
    const {
        getInputProps,
        getRootProps,
        isFileDialogActive,
        acceptedFiles,
    } = useDropzone({
        onDrop: async (acceptedFiles) => {
            const formData = new FormData()
            formData.append('file', acceptedFiles[0])
            await uploadDocumentAction(formData)
        }
    })
    return (
        <>
            <input {...getInputProps()}/>
            <LoadingButton 
                size='1'
                {...getRootProps()}
                isLoading={isFileDialogActive}
            ><UploadIcon/>Upload Files</LoadingButton>
        </>
    )
}