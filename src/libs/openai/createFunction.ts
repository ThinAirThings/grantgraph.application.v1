import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";
import { FunctionDefinition } from "openai/resources/shared.mjs";
export const createFunction = ({
    fnName,
    fnDescription,
    zodObject
}: {
    fnName: string
    fnDescription: string
    zodObject: z.ZodObject<any, any>
}) => ({
    type: 'function' as const,
    function: {
        name: fnName,
        description: fnDescription,
        parameters: zodToJsonSchema(zodObject, "fnSchema").definitions!['fnSchema']
    } as FunctionDefinition
})