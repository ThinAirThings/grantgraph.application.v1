'use client'

import { Flex } from "@radix-ui/themes"
import { useQueriesStore } from "./hook.useQueriesStore"
import { FC } from "react"
import { GrantFeedCard } from "@/src/components/GrantFeedCard/client.GrantFeedCard"


export const MatchResults: FC<{
    savedGrantIds: string[]
}> = ({
    savedGrantIds
}) => {
    const matchResults = useQueriesStore(state => state.matchResults)
    return (
        <Flex direction={'column'} style={{maxHeight: '100%'}} pr='4' gap='3'>
            {matchResults.map(match => <GrantFeedCard
                key={match.grantId}
                grant={match}
                userSavedGrantIds={savedGrantIds}
            />)}
        </Flex>
    )
}

