import { FormEvent } from "react"
import { createSafeActionClient, DEFAULT_SERVER_ERROR } from "next-safe-action";
import { HookResult } from "next-safe-action/hooks";

export const safeAction = createSafeActionClient({
    handleReturnedServerError: (error) => {
        if (error instanceof Error){
            return error.message
        }
        return DEFAULT_SERVER_ERROR
    }
});

export const submitExecution = (
    event: FormEvent<HTMLFormElement>, 
    execution: (payload: any)=>any,
    additionalArgs?: Record<string, any>
) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    execution({
        ...data,
        ...additionalArgs
    })
}


export const getStringError = (result: HookResult<any, any>) => {
    return result.serverError ? 
        result.serverError :
        result.validationErrors ?
            JSON.stringify(result.validationErrors) :
            null
}