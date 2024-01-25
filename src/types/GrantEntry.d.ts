import { EmbeddedText } from "./EmbeddedText"

export type GrantEntry = {
    grantId: string
    title: EmbeddedText
    description: EmbeddedText
    agency: EmbeddedText
    opportunityNumber: string
    openDate: string
    closeDate: string
    rawDescription: string
    grantSourceUrl: string
    awardCeiling: string
    awardFloor: string
    awardEstimate: string
}