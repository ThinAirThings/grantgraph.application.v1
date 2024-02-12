'use client'
import { BookmarkButton } from "@/src/components/BookmarkButton/client.BookmarkButton";
import { HStack } from "@/styled-system/jsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const GrantHeader: FC<{
    title: string,
    savedGrantIds: string[]
    grantId: string
}> = ({
    title,
    savedGrantIds,
    grantId
}) => {
    const router = useRouter()
    return (
        <HStack gap='5' >
            <ChevronLeftIcon 
                style={{
                    cursor: 'pointer',
                    transform: "scale(3)"
                }}
                onClick={() => router.back()}
            />
            <Heading size='5'>{title}</Heading>
            <BookmarkButton
                savedGrantIds={savedGrantIds}
                grantId={grantId}
            />
        </HStack>
    )
}