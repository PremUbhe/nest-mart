import {z} from "zod"

export const signInSchemma = z.object({
    email: z.string(),
    password: z.string()
})