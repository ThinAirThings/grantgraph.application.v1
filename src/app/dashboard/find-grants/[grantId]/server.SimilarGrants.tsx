'use server'

import { getCachedSimilarGrants } from "@/src/cache/getCachedSimilarGrants"
import { VStack } from "@/styled-system/jsx"
import { Heading } from "@radix-ui/themes"
import { FC } from "react"
import { SimilarGrantsControl } from "./client.SimilarGrantsControl"


export const SimilarGrants: FC<{
    grantId: string
}> = async ({
    grantId
}) => {
    const similarGrants = await getCachedSimilarGrants(grantId)

    return (
        <VStack alignItems={'start'} width='calc(100vw - 300px)' pr='4'>
            <Heading size='4' color='gray'>Similar Grants</Heading>
            <SimilarGrantsControl rootGrantId={grantId} similarGrants={similarGrants}/>
        </VStack>
    )
}