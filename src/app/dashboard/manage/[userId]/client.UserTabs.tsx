'use client'
import { GrantGraphUser } from "@/src/types/GrantGraphUser";
import { CheckIcon, FileTextIcon, InfoCircledIcon, UploadIcon } from "@radix-ui/react-icons";
import { Badge, Box, Flex, Heading, IconButton, Tabs, Tooltip } from "@radix-ui/themes";
import { FC, Suspense, useEffect, useState } from "react";
import { getCVIndexStateAction } from "./action.getCVIndexState";
import { RotatingLines } from "react-loader-spinner";
import { token } from "@/styled-system/tokens";
import { ProfileTab } from "./client.tab.Profile";
import { GrantMatch } from "@/src/types/GrantMatch";
import { GrantFeed } from "@/src/components/GrantFeed/client.GrantFeed";
import { StrippedGrantEntry } from "@/src/types/GrantEntry";
import { InfoTooltip } from "@/src/interface/InfoTooltip/client.InfoTooltip";
import Loading from "./loading";


export const UserTabs: FC<{
    userData: GrantGraphUser
    cvReadUrl: string | null | undefined
    matches: GrantMatch[]
    userSavedGrantIds: string[]
    researcherSavedGrants: StrippedGrantEntry[]
}> = ({
    userData,
    cvReadUrl,
    matches,
    userSavedGrantIds,
    researcherSavedGrants
}) => {
    // State
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
                        userData={userData}
                        cvReadUrl={cvReadUrl}
                        setCvIndexState={setCvIndexState}
                    />
                </Tabs.Content>
                <Tabs.Content value="feed">
                    <Flex direction={'column'} gap='2'>
                        <Flex gap='2' align='center'>
                            <Heading size='4'>{userData.userName}'s Grant Feed</Heading>
                            <InfoTooltip
                                content={`Researchers receive automatic matches with the latest grants.gov releases in this feed.`}
                            />
                        </Flex>
                        <GrantFeed
                            grants={matches}
                            userSavedGrantIds={userSavedGrantIds}
                        />
                    </Flex>
                </Tabs.Content>
                <Tabs.Content value="saved-grants">
                    <Flex direction={'column'} gap='2'>
                        <Flex gap='2' align='center'>
                            <Heading size='4'>{userData.userName}'s Saved Grants</Heading>
                            <InfoTooltip
                                content={`Bookmarking grants here is exclusive to your profile and won't affect ${userData.userName}'s bookmarks.`}
                            />
                        </Flex>
                        <GrantFeed
                            grants={researcherSavedGrants}
                            userSavedGrantIds={userSavedGrantIds}
                        />
                    </Flex>
                </Tabs.Content> 
            </Box>
        </Tabs.Root>
    )
}