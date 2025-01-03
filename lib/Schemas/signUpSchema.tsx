import {z} from 'zod'

export const usernameValidation = z
.string()
.min(2, "Username must be atleast 2 characters")
.max(20, "Username must be less then 20 characters")
.regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email"}).regex(/.+\@.+\..+/, "Please use a valid email address"),
    password : z.string().min(8, {message: "password must be at least 8 characters"}).max(20, "Password must not exceed 20 characters").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, "Password must include at least one uppercase letter, one lowercase letter, one special character")
})