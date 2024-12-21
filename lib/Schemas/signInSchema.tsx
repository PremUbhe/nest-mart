import {z} from "zod"

export const signInSchemma = z.object({
    identifier: z.string(),
    password: z.string()
})