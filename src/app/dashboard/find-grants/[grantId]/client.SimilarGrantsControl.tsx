'use client'

import { getCachedSimilarGrants } from "@/src/cache/getCachedSimilarGrants"
import { HStack, VStack } from "@/styled-system/jsx"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { Card, Grid, Heading, IconButton } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"
import {fromEvent} from 'rxjs'

const calculateSliceSize = () => {
    const windowWidth = window.innerWidth
    if (windowWidth < 768) {
        return 1
    } else if (windowWidth < 1024) {
        return 2
    } else if (windowWidth < 1280) {
        return 3
    } else {
        return 4
    }
}

export const SimilarGrantsControl: FC<{
    rootGrantId: string
    similarGrants: Awaited<ReturnType<typeof getCachedSimilarGrants>>
}> = ({
    rootGrantId,
    similarGrants
}) => {
    const router = useRouter()
    const [sliceSize, setSliceSize] = useState(calculateSliceSize())
    const [pageNumber, setPageNumber] = useState(0)
    useEffect(() => {
        const subscription = fromEvent(window, 'resize')
            .subscribe(() => {
                setSliceSize(calculateSliceSize())
            })
        return () => subscription.unsubscribe()
    }, [])
    return (
        <HStack maxWidth={'full'} alignItems='center'>
            <IconButton 
                variant='outline'
                disabled={pageNumber === 0}
                onClick={() => setPageNumber(pageNumber - 1)}
            ><ChevronLeftIcon/></IconButton>
            <Grid 
                gap='3'
                display='inline-grid'
                columns={{
                    initial: '1',
                    sm: '2',
                    md: '3',
                    lg: '4',
                }}
                rows='1'
                style={{overflow:'hidden'}}
            >
                {similarGrants?.filter(grant => grant.grantId !== rootGrantId)
                    .slice(pageNumber*sliceSize, (pageNumber+1)*sliceSize).map((grant) => (
                    <Card key={grant.grantId} style={{minWidth: '200px', minHeight: '300px', cursor: 'pointer'}}
                        onClick={() => router.push(`/dashboard/find-grants/${grant.grantId}`)}
                    >
                        <VStack gap='2' alignItems='start'>
                            <Heading size={'2'} color='gray'>{grant.agency.text}</Heading>
                            <Heading size='2'>{grant.title.text}</Heading>
                        </VStack>
                    </Card>
                ))}
            </Grid>
            <IconButton 
                variant='outline'
                disabled={pageNumber === Math.floor(similarGrants!.length/sliceSize)-1}
                onClick={() => setPageNumber(pageNumber + 1)}
            ><ChevronRightIcon/></IconButton>
        </HStack>
    )
}



