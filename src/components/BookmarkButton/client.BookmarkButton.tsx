'use client'

import { useOptimisticAction } from "next-safe-action/hooks"
import { updateSavedGrantAction } from "../GrantFeedCard/action.updateSavedGrant"
import { FC } from "react"
import { IconButton } from "@radix-ui/themes"
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons"


export const BookmarkButton: FC<{
    savedGrantIds: string[]
    grantId: string
}> = ({
    savedGrantIds,
    grantId
}) => {
    const {
        execute, result, optimisticData
    } = useOptimisticAction(updateSavedGrantAction, {
        saved: savedGrantIds?.includes?.(grantId)
    }, (state) => ({
        saved: !state.saved
    }))
    return (
        <IconButton size='2' color='gray' variant='ghost'
            onClick={async (event) => {
                event.stopPropagation()
                execute({
                    grantId: grantId,
                    saved: !savedGrantIds?.includes?.(grantId)
                })
            }}
        >{(() => {
            if (result.data) {
                return result.data.saved ? <BookmarkFilledIcon/> : <BookmarkIcon/>
            }
            return optimisticData.saved ? <BookmarkFilledIcon/> : <BookmarkIcon/>
        })()}
        </IconButton>
    )
}