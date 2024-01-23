'use client'
import { create } from "zustand"
import {enableMapSet, produce} from "immer"
import {v4 as uuidv4} from "uuid"
import { GrantEntry } from "@/src/cache/getCachedAutoMatches"
enableMapSet()


type QueriesState = {
    searchQueries: Map<string, {query: string}>
    matchResults: GrantEntry[]
    includeKnowledgeBase: boolean
    createSearchQuery: () => void
    updateSearchQuery: (queryKey: string, query: string) => void
    deleteSearchQuery: (queryKey: string) => void
    updateMatchResults: (matchResults: GrantEntry[]) => void
}
// Note that the extra () is so that TypeScript can infer the type.
// Check Zustand docs but its a contravariant/covariant thing
export const useQueriesStore = create<QueriesState>()((set) => ({
    searchQueries: new Map([
        [uuidv4(), {query: ''}]
    ]),
    matchResults: [],
    includeKnowledgeBase: false,
    createSearchQuery: () => set(produce((state: QueriesState) => {
        state.searchQueries.set(uuidv4(), {query: ''})
    })),
    updateSearchQuery: (queryKey: string, query: string) => set(produce((state: QueriesState) => {
        state.searchQueries.set(queryKey, {query})
    })),
    deleteSearchQuery: (queryKey: string) => set(produce((state: QueriesState) => {
        state.searchQueries.delete(queryKey)
    })),
    updateMatchResults: (matchResults: GrantEntry[]) => set(produce((state: QueriesState) => {
        state.matchResults = matchResults
    }))
}))
