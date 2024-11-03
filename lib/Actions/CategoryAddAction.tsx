import React from 'react';
import { z } from 'zod'

const categorySchema = z.object({
    name: z.string(),
    imgURL: z.string()
})


const CategoryAddAction = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData);
    const result = categorySchema.safeParse(formValues);

    if (!result.success) {
        console.error("Validation failed", result.error);
        return;
    }
    

    try {
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.data)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Category added successfully:", data);
            alert("Category added successfully!");
        } else {
            const errorData = await response.json();
            console.error("Error adding category:", errorData);
            alert("Failed to add category.");
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please try again.");
    }
}

export default CategoryAddAction