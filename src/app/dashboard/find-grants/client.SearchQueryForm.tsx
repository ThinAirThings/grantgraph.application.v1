'use client'

import { IconButton, Switch, Text } from "@radix-ui/themes"
import { FC, useState } from "react"
import * as Form from "@radix-ui/react-form";
import { PlusIcon, RocketIcon } from "@radix-ui/react-icons";
import { HStack, VStack } from "@/styled-system/jsx";
import { SearchQueryRow } from "./client.SearchQueryRow";
import { LoadingButton } from "@/src/interface/LoadingButton/LoadingButton";
import { useQueriesStore } from "./hook.useQueriesStore";
import { searchGrantsAction } from "./action.searchGrants";

export const SearchQueryForm: FC = () => {
    const [searching, setSearching] = useState(false)
    const searchQueries = useQueriesStore(state => state.searchQueries)
    const includeKnowledgeBase = useQueriesStore(state => state.includeKnowledgeBase)
    const createSearchQuery = useQueriesStore(state => state.createSearchQuery)
    const updateMatchResults = useQueriesStore(state => state.updateMatchResults)
    return (
        <VStack w='full' alignItems={'start'} gap='3'>
            <HStack gap='3' justify={'start'}>
                <Text color='gray' weight='bold'>Search Queries</Text>
                <IconButton radius="full" size='1'
                    onClick={() => createSearchQuery()}
                ><PlusIcon/></IconButton>
            </HStack>
            <Form.Root style={{width: '100%'}}
                onSubmit={async (event) => {
                    event.preventDefault()
                    setSearching(true)
                    const val = await searchGrantsAction({
                        searchQueries,
                        includeKnowledgeBase
                    })
                    setSearching(false)
                    updateMatchResults(val.data!)
                }}
            > 
                <VStack alignItems='start'>
                    {[...searchQueries].map(([queryKey]) => (
                        <SearchQueryRow key={queryKey} queryKey={queryKey}/>
                    ))}
                    <HStack justify='space-between' w='full'>
                        <LoadingButton size='1' isLoading={searching} type='submit'><RocketIcon/>Search</LoadingButton>
                        <HStack>
                            <Text color='gray'>Match grants based on my personal profile</Text>
                            <Switch radius='full'
                                checked={includeKnowledgeBase}
                                onCheckedChange={includeKnowledgeBase => useQueriesStore.setState({includeKnowledgeBase})}
                            />
                        </HStack>
                    </HStack>
                </VStack>
            </Form.Root>
        </VStack>

    )
}