'use server';
import { z } from 'zod'
import { revalidateTag } from 'next/cache'

type ApiSchema = {
    success: boolean,
    message: string,
}

const BrandSchema = z.object({
    name: z.string(),
})


const BrandAddAction = async (values: z.infer<typeof BrandSchema>): Promise<ApiSchema> => {

    const validatedFields = BrandSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, message: "Invalid fields" }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands`, {
            headers: { Accept: "application/json", },
            method: "POST",
            next: { tags: ['brand'] },
            body: JSON.stringify(validatedFields.data)
        });

        if (response.ok) {
            revalidateTag('brand');
            return { success: true, message: "Brand added successfully" };
        }

        return { success: false, message: "Error while adding brand successfully" };

    } catch (error) {
        return { success: false, message: "An unexpected error occurred!" + error };
    }
}

export default BrandAddAction