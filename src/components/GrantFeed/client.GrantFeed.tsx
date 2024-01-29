import { StrippedGrantEntry } from "@/src/types/GrantEntry";
import { GrantMatch } from "@/src/types/GrantMatch";
import { Flex, ScrollArea } from "@radix-ui/themes";
import { FC } from "react";
import { GrantFeedCard } from "../GrantFeedCard/client.GrantFeedCard";


export const GrantFeed: FC<{
    grants: (GrantMatch | StrippedGrantEntry)[]
    userSavedGrantIds: string[]
    heightOffset?: number
}> = ({
    grants,
    userSavedGrantIds,
    heightOffset
}) => {
    return (
        <ScrollArea type="always" scrollbars="vertical" style={{height: `calc(100vh - ${heightOffset??175}px)`}}>
            <Flex direction={'column'} style={{maxHeight: '100%'}} pr='4' gap='3'>
                {grants.map(match => <GrantFeedCard
                    key={match.grantId}
                    grant={match}
                    userSavedGrantIds={userSavedGrantIds}
                />)}
            </Flex>
        </ScrollArea>
    )
}