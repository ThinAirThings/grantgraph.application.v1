'use client'

import { HStack } from "@/styled-system/jsx"
import { FC } from "react"
import * as Form from "@radix-ui/react-form";
import { IconButton, TextField } from "@radix-ui/themes";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useQueriesStore } from "./hook.useQueriesStore";

export const SearchQueryRow: FC<{
    queryKey: string
}> = ({
    queryKey
}) => {
    const searchQuery = useQueriesStore(state => state.searchQueries.get(queryKey)!.query)
    const updateSearchQuery = useQueriesStore(state => state.updateSearchQuery)
    const deleteSearchQuery = useQueriesStore(state => state.deleteSearchQuery)
    
    return (
        <HStack gap='3' w='full'>
            <Form.Field name={queryKey} asChild>
                <TextField.Root size='2' radius='full' style={{width: '100%'}}>
                    <TextField.Slot>
                        <MagnifyingGlassIcon/>
                    </TextField.Slot>
                    <Form.Control asChild>
                        <TextField.Input
                            placeholder={`I'm looking for grants that...`}
                            value={searchQuery}
                            onChange={e => updateSearchQuery(queryKey, e.target.value)}
                        />
                    </Form.Control>
                </TextField.Root>
            </Form.Field>
            <IconButton variant='ghost' color='red' type='button'
                onClick={() => deleteSearchQuery(queryKey)}
            >
                <Cross2Icon />
            </IconButton>
        </HStack>
    )
}