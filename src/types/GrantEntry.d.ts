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

export type StrippedGrantEntry = {
    grantId: string
    title: {
        text: string
    }
    agency: {
        text: string
    }
    description: {
        text: string
    }
    opportunityNumber: string
    openDate: string
    closeDate: string
    rawDescription: string
    grantSourceUrl: string
    awardCeiling: string
    awardFloor: string
    awardEstimate: string
    similarGrants: {
        grantId: string
        similarity: number
    }[]
}