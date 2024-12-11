'use server';
import { z } from 'zod'
import { revalidateTag } from 'next/cache'
import Aleart from '@/components/Aleart';

const BrandSchema = z.object({
    name: z.string(),
})


const BrandAddAction = async (formData: FormData) => {

    const formValues = Object.fromEntries(formData);
    const result = BrandSchema.safeParse(formValues);

    if (!result.success) {
        console.error("Validation failed", result.error);
        return;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands`, {
            headers: { Accept: "application/json", },
            method: "POST",
            next: { tags: ['brand'] },
            body: JSON.stringify(result.data)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Brand added successfully:", data);
            <Aleart params="brand" />
            revalidateTag('brand');

        } else {
            const errorData = await response.json();
            console.error("Error adding Brand:", errorData);
        }
    } catch (error) {
        console.error("Network error:", error);
    }
}

export default BrandAddAction