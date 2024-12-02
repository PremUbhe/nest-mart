'use server';
import { z } from 'zod';
import cloudinary from "@/lib/cloudinary";

const categorySchema = z.object({
    name: z.string(),
    img: z.instanceof(File),
});

const CategoryAddAction = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData);
    const result = categorySchema.safeParse(formValues);

    if (!result.success) {
        console.error("Validation failed", result.error);
        return;
    }

    let uploadResult;

    try {
        if (result.data) {
            const img = result.data.img;
            const buffer = Buffer.from(await img.arrayBuffer());

            uploadResult = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    (error, result) => {
                        if (error || !result) return reject(error);
                        resolve(result as { public_id: string; secure_url: string });
                    }
                );
                stream.end(buffer);
            });
        } else {
            throw new Error("No data found for the image upload.");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        return;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: result.data.name,
                img: uploadResult?.secure_url,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Category added successfully:", data);
        } else {
            const errorData = await response.json();
            console.error("Error adding category:", errorData);
        }
    } catch (error) {
        console.error("Network error:", error);
    }
};

export default CategoryAddAction;
