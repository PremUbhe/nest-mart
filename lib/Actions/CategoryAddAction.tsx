'use server';
import { z } from 'zod';
import cloudinary from "@/lib/cloudinary";
import { revalidateTag } from 'next/cache';

type ApiResponse = {
    success: boolean,
    message: string,
}

const categorySchema = z.object({
    name: z.string(),
    img: z.instanceof(File),
});

const CategoryAddAction = async (formData: FormData): Promise<ApiResponse> => {

    const formValues = Object.fromEntries(formData);
    const result = categorySchema.safeParse(formValues);

    if (!result.success) {
        return { success: false, message: "Validation failed" };
    }

    let uploadResult;

    try {
        if (result.data) {
            const img = result.data.img;
            const buffer = Buffer.from(await img.arrayBuffer());

            uploadResult = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'image',
                        folder: 'NestMart/Category'
                    },
                    (error, result) => {
                        if (error || !result) return reject(error);
                        resolve(result as { public_id: string; secure_url: string });
                    }
                );
                stream.end(buffer);
            });

        } else {
            return { success: false, message: "No data found for the image upload." };
        }
    } catch (error) {
        return { success: false, message: "Error while uploading image" + error };
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
            revalidateTag('category')
            return { success: true, message: "Category added successfully" };
        }
        return { success: false, message: "Error while adding category" };

    } catch (error) {
        return { success: false, message: "Error uploading image" + error };
    }
};

export default CategoryAddAction
