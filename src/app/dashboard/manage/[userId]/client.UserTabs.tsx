'use client'
import { updateUserAction } from "@/src/api/users/action.updateUser";
import { LabeledField } from "@/src/interface/LabeledField/client.LabeledField";
import { LabeledSelect } from "@/src/interface/LabeledSelect/client.LabeledSelect";
import { LoadingButton } from "@/src/interface/LoadingButton/LoadingButton";
import { GrantGraphUser } from "@/src/types/GrantGraphUser";
import { Grid, VStack } from "@/styled-system/jsx";
import { CheckIcon, FileTextIcon, UploadIcon } from "@radix-ui/react-icons";
import { Badge, Box, Button, Flex, Heading, Tabs, Text } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {useImmer} from 'use-immer'
import { getCVUploadUrlAction } from "./action.getCVUploadUrl";
import { PDFViewer } from "@/src/interface/PDFViewer/PDFViewer";
import { indexCVAction } from "./action.indexCV";
import { getCVIndexStateAction } from "./action.getCVIndexState";
import { updateCVIndexStateAction } from "./action.updateCVIndexState";
import { RotatingLines } from "react-loader-spinner";
import { token } from "@/styled-system/tokens";
import { updateResearcherMatchesAction } from "./action.updateResearcherMatches";
import { ProfileTab } from "./client.tab.Profile";
import { Feed } from "./server.tab.MatchFeed";


export const UserTabs: FC<{
    userData: GrantGraphUser,
    cvReadUrl: string | null | undefined
}> = ({
    userData,
    cvReadUrl
}) => {
    // State
    const [userDataState, updateUserDataState] = useImmer<GrantGraphUser>(userData)
    const [updatingUser, setUpdatingUser] = useState(false)
    const [cvUrl, setCvUrl] = useState(cvReadUrl)
    const [cvIndexState, setCvIndexState] = useState<null | 'indexing' | 'findingMatches' | 'ready'>(userData.cvIndexState??null)
    // Actions
    useEffect(() => {
        (async () => {
            if (cvIndexState === null) {
                setCvIndexState((await getCVIndexStateAction({
                    organizationId: userData.organizationId,
                    userId: userData.userId
                })).data??null)
            }
        })()
        const checkIndexState = async () => {
            if (cvIndexState === 'indexing' || cvIndexState === 'findingMatches') {
                const cvIndexStateResponse = await getCVIndexStateAction({
                    organizationId: userData.organizationId,
                    userId: userData.userId
                })
                setCvIndexState(cvIndexStateResponse?.data ?? null)
                setTimeout(checkIndexState, 2000)
            }
        }
        checkIndexState()
    }, [cvIndexState])
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
        <Tabs.Root defaultValue="profile" style={{width: '100%'}}>
            <Tabs.List>
                <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
                <Tabs.Trigger value="feed">Feed</Tabs.Trigger>
                <Tabs.Trigger value="saved-grants">Saved Grants</Tabs.Trigger>
                <Flex align='center' justify={'center'}>
                {cvIndexState === 'indexing' 
                    ? <Badge color='orange' radius='full'><RotatingLines
                        width='16'
                        strokeWidth="2"
                        strokeColor={token('colors.orange.10')}
                    />Indexing</Badge>
                    : cvIndexState === 'ready'
                        ? <Badge color='green' radius='full'><CheckIcon/>Ready</Badge>
                    : cvIndexState === 'findingMatches'
                        ? <Badge color='blue' radius='full'><RotatingLines
                            width='16'
                            strokeWidth="2"
                            strokeColor={token('colors.blue.10')}
                        />Finding Matches</Badge>
                        : <Badge color='yellow' radius='full'><FileTextIcon/>Upload a CV to Begin</Badge>}
                </Flex>

            </Tabs.List>
            <Box py='4' px='2'>
                <Tabs.Content value="profile">
                    <ProfileTab
                        userData={userDataState}
                        cvReadUrl={cvUrl}
                        setCvIndexState={setCvIndexState}
                    />
                </Tabs.Content>
                <Tabs.Content value="feed">
                    <Feed/>
                </Tabs.Content>
                <Tabs.Content value="saved-grants">Bookmarks</Tabs.Content> 
            </Box>
        </Tabs.Root>
    )
}