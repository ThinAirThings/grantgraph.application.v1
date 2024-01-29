import { StrippedGrantEntry } from "./GrantEntry";



export type GrantMatch = StrippedGrantEntry & {
    matchReason?: string
    percentMatch: number
}