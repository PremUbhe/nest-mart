'use client';

import { z } from 'zod'
import { signIn } from 'next-auth/react';
import { signInSchemma } from '../Schemas/signInSchema';

const LogInAction = async (values: z.infer<typeof signInSchemma>) => {

    const validatedFields = signInSchemma.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { identifier, password } = validatedFields.data;

    try {
        const result = await signIn("credentials", {
            redirect: false,
            identifier,
            password,
        });

        if (result?.error) {
            return { error: result.error === "CredentialsSignin" ? "Invalid Credentials!" : "Something went wrong!" };
        }
        return { success: true };

    } catch (error) {
        return { error: "An unexpected error occurred!" + error };
    }

}

export default LogInAction