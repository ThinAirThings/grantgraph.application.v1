import { getCachedUser } from "@/src/cache/getCachedUser";
import { auth } from "@/src/libs/auth/auth";
import { HStack, VStack } from "@/styled-system/jsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";
import Link from "next/link";
import { UserTabs } from "./client.UserTabs";
import { getCVReadUrlAction } from "./action.getCVReadUrl";
import { getCachedAutoMatches } from "@/src/cache/getCachedAutoMatches";




export default async function ({
    params
}: {
    params: {
        userId: string
    }
}) {
    const user = (await auth())!.user!
    const userData = await getCachedUser(
        user.organizationId, 
        params.userId
    )
    const cvReadUrl = (await getCVReadUrlAction({
        organizationId: (await auth())!.user!.organizationId,
        userId: params.userId
    })).data?.readUrl
    const matches = await getCachedAutoMatches({
        organizationId: user.organizationId,
        userId: params.userId
    })
    return (
        <VStack alignItems='start' w='full' maxHeight={'full'}>
            <HStack justify={'space-between'} w='full'>
                <HStack>
                    <Link href={'/dashboard/manage'}>
                        <ChevronLeftIcon 
                            style={{
                                cursor: 'pointer',
                                transform: "scale(2)"
                            }}
                        />
                    </Link>
                    <Heading>{userData.userName}</Heading>
                </HStack>
            </HStack>
            <UserTabs
                userData={userData}
                cvReadUrl={cvReadUrl}
            />
        </VStack>
    )
}