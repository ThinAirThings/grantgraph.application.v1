'use client'

import { useDropzone } from "react-dropzone"
import { getCVUploadUrlAction } from "./action.getCVUploadUrl"
import { FC, useState } from "react"
import { GrantGraphUser } from "@/src/types/GrantGraphUser"
import { updateCVIndexStateAction } from "./action.updateCVIndexState"
import { indexCVAction } from "./action.indexCV"
import { Grid, VStack } from "@/styled-system/jsx"
import { Box, Button, Flex, Heading } from "@radix-ui/themes"
import { LabeledField } from "@/src/interface/LabeledField/client.LabeledField"
import { useImmer } from "use-immer"
import { LabeledSelect } from "@/src/interface/LabeledSelect/client.LabeledSelect"
import { LoadingButton } from "@/src/interface/LoadingButton/LoadingButton"
import { updateUserAction } from "@/src/api/users/action.updateUser"
import { PDFViewer } from "@/src/interface/PDFViewer/PDFViewer"
import { UploadIcon } from "@radix-ui/react-icons"

export const ProfileTab: FC<{
    userData: GrantGraphUser
    cvReadUrl: string | null | undefined
    setCvIndexState: (cvIndexState: 'indexing' | 'ready') => void
}> = ({
    userData,
    cvReadUrl,
    setCvIndexState
}) => {
    // State
    const [cvUrl, setCvUrl] = useState(cvReadUrl)
    const [updatingUser, setUpdatingUser] = useState(false)
    const [userDataState, updateUserDataState] = useImmer<GrantGraphUser>(userData)
    const {
        getInputProps,
        getRootProps,
        isFileDialogActive,
        acceptedFiles,
    } = useDropzone({
        onDrop: async (acceptedFiles) => {
            const cvUploadUrlResult = (await getCVUploadUrlAction({
                organizationId: userData.organizationId,
                userId: userData.userId
            }))
            
            await fetch(cvUploadUrlResult.data!.createUrl, {
                method: 'PUT',
                body: acceptedFiles[0]
            })
            setCvUrl(cvUploadUrlResult.data!.readUrl)
            await updateCVIndexStateAction({
                organizationId: userData.organizationId,
                userId: userData.userId,
                cvIndexState: 'indexing'
            })
            setCvIndexState('indexing')
            await indexCVAction({
                organizationId: userData.organizationId,
                userId: userData.userId
            })
        }
    })
    return (
        <VStack alignItems='start'>
            <Grid gridTemplateColumns={`minmax(0, 1fr) minmax(0, 2fr)`} gap='5' pl='3' w='full'>
                <Flex direction={'column'} gap='3'>
                    <Heading size={'4'}>{userData.userName}'s Profile</Heading>
                    <LabeledField
                        label={`User's Name`}
                        value={userDataState.userName}
                        onChange={e => updateUserDataState(draft => {
                            draft.userName = e.target.value
                        })}
                    />
                    <LabeledField
                        label={`User's Email`}
                        value={userDataState.userEmail}
                        onChange={e => updateUserDataState(draft => {
                            draft.userEmail = e.target.value
                        })}
                    />
                    <LabeledSelect
                        label={`User's Role`}
                        value={userDataState.userRole}
                        options={[{
                            label: 'Admin',
                            value: 'admin'
                        }, {
                            label: 'User',
                            value: 'user'
                        }]}
                        onChange={value => updateUserDataState(draft => {
                            draft.userRole = value
                        })}
                    />
                    <Flex gap='3' justify={'end'}>
                        <LoadingButton
                            isLoading={updatingUser}
                            onClick={async () => {
                                setUpdatingUser(true)
                                await updateUserAction({
                                    organizationId: userData.organizationId,
                                    userId: userData.userId,
                                    userName: userDataState.userName,
                                    userEmail: userDataState.userEmail,
                                    userRole: userDataState.userRole as 'admin' | 'user'
                                })
                                setUpdatingUser(false)
                            }}
                        >Save</LoadingButton>
                        <Button color='red' variant='outline'
                            onClick={() => {
                                console.log(userData)
                                updateUserDataState(draft => {
                                    draft.userName = userData.userName
                                    draft.userEmail = userData.userEmail
                                    draft.userRole = userData.userRole
                                })

                            }}
                        >Cancel</Button>
                    </Flex>
                </Flex>
                <Flex direction={'column'}>
                    <Flex justify={'between'} width='100%'>
                        <Heading size='4'>Curriculum Vitae / Resume</Heading>
                        <input {...getInputProps()}/>
                        <Flex gap='3'>
                            <LoadingButton 
                                size='1'
                                {...getRootProps()}
                                isLoading={isFileDialogActive}
                            ><UploadIcon/>Upload CV</LoadingButton>
                        </Flex>

                    </Flex>
                    <Box>
                        {cvUrl && <PDFViewer
                            pdfDocumentUrl={cvUrl}
                            heightOffset={260}
                        />}
                    </Box>
                </Flex>
            </Grid>
        </VStack>
    )
}