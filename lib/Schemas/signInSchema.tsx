import {z} from "zod"

export const signInSchemma = z.object({
    identifier: z.string().min(2, {message: "Username or Email ID is required"}),
    password: z.string().min(8, {message: "minimum 8 charaters are required"})
})