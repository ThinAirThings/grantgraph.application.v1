'use client'

import { Flex } from "@radix-ui/themes"
import { useQueriesStore } from "./hook.useQueriesStore"
import { FC } from "react"
import { MatchCardClient } from "@/src/components/MatchCard/client.MatchCardClient"


export const MatchResults: FC<{
    savedGrantIds: string[]
}> = ({
    savedGrantIds
}) => {
    const matchResults = useQueriesStore(state => state.matchResults)
    return (
        <Flex direction={'column'} style={{maxHeight: '100%'}} pr='4' gap='3'>
            {matchResults.map(match => <MatchCardClient
                key={match.grantId}
                grant={match}
                savedGrantIds={savedGrantIds}
            />)}
        </Flex>
    )
}

