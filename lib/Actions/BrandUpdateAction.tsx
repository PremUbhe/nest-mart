'use server';
import { z } from 'zod'
import { revalidateTag } from 'next/cache'

const BrandSchema = z.object({
    name: z.string(),
})


const BrandUpdateAction = async (formData: FormData) => {

    const formValues = Object.fromEntries(formData);
    const result = BrandSchema.safeParse(formValues);

    if (!result.success) {
        console.error("Validation failed", result.error);
        return;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.data)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Brand Updated successfully:", data);

            revalidateTag('brand');

        } else {
            const errorData = await response.json();
            console.error("Error While Updating Brand:", errorData);
        }
    } catch (error) {
        console.error("Network error:", error);
    }
}

export default BrandUpdateAction