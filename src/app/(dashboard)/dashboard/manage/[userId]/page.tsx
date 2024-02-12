import { getCachedUser } from "@/src/cache/getCachedUser";
import { auth } from "@/src/libs/auth/auth";
import { HStack, VStack } from "@/styled-system/jsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";
import Link from "next/link";
import { UserTabs } from "./client.UserTabs";
import { getCVReadUrlAction } from "./action.getCVReadUrl";
import { getCachedAutoMatches } from "@/src/cache/getCachedAutoMatches";
import { getCachedSavedGrantIds } from "@/src/cache/getCachedSavedGrantIds";
import { getCachedOpenGrants } from "@/src/cache/getCachedOpenGrants";




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
    const userSavedGrantIds = await getCachedSavedGrantIds({
        organizationId: user.organizationId,
        userId: user.userId
    })
    const researcherSavedGrants = await getCachedOpenGrants(
        ...await getCachedSavedGrantIds({
            organizationId: userData.organizationId,
            userId: params.userId
        })
    )
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
                matches={matches}
                userSavedGrantIds={userSavedGrantIds}
                researcherSavedGrants={researcherSavedGrants}
            />
        </VStack>
    )
}