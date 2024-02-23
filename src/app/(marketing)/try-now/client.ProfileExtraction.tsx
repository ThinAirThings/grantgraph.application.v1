'use client'
import { LabeledField } from "@/src/interface/LabeledField/client.LabeledField";
import { LoadingButton } from "@/src/interface/LoadingButton/LoadingButton";
import { Box, HStack, VStack } from "@/styled-system/jsx";
import { useState } from "react";
import { getProfileSummary } from "./action.getProfileSummary";
import { Text } from "@radix-ui/themes";
import { RotatingLines } from "react-loader-spinner";

export const ProfileExtraction = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [extractionState, setExtractionState] = useState<'idle' | 'running' | 'done'>('idle')
    const [stateMessage, setStateMessage] = useState<string | null>(null)
    const [profileSummary, setProfileSummary] = useState<string | null>(null)
    const [profileLink, setProfileLink] = useState<string>('')

    return (
        <form 
            style={{width: '100%'}}
            onSubmit={async (event) => {
                event.preventDefault()
                if (!profileLink) return
                setIsLoading(true)
                setExtractionState('running')
                setStateMessage('Finding profile...')
                setTimeout(() => {
                    setStateMessage('Extracting information...')
                }, 5000)
                setTimeout(() => {
                    setStateMessage('Analyzing data...')
                }, 12000)
                const profileSummary = await getProfileSummary({url: profileLink})
                setProfileSummary(profileSummary.data)
            }}
        >
            <VStack w='full'>
                <HStack w='full'>
                    <Box w='full'>
                        <LabeledField
                            label="Link to Public Profile"
                            value={profileLink}
                            onChange={(e) => setProfileLink(e.target.value)}
                            placeholder="https://university.edu/your-name"
                        />
                    </Box>
                </HStack>
                <HStack w='full'>
                    {profileSummary
                    ?   <Text>{profileSummary??''}</Text>
                    :   extractionState === 'idle' 
                            ? <LoadingButton 
                                disabled={!!!profileLink}
                                isLoading={isLoading}
                            >Next Step!</LoadingButton>
                            :  <HStack><RotatingLines
                                width="24px"
                            /><Text>{stateMessage??''}</Text></HStack>
                    }
                </HStack>
            </VStack>
        </form>
    )
}