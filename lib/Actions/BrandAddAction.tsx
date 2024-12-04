'use server';
import { z } from 'zod'

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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.data)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Brand added successfully:", data);
            alert("Brand added successfully!");
        } else {
            const errorData = await response.json();
            console.error("Error adding Brand:", errorData);
            alert("Failed to add Brand.");
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please try again.");
    }
}

export default BrandAddAction