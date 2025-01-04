'use server';
import { z } from 'zod';
import cloudinary from "@/lib/cloudinary";
import { revalidateTag } from 'next/cache';
import dbConnect from '../dbConnect';
import CategoryModel from '../Models/Category';


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

    // checking if name already exists
    try {
        await dbConnect();

        const name = result.data.name

        const res = await CategoryModel.findOne({ name });

        if (res) {
            return { success: false, message: "Category name already exists" }
        }

    } catch (error) {
        return { success: false, message: "Error while checking category name" + error };
    }

    // uploading img to coludinary
    let uploadResult;

    try {
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

    } catch (error) {
        return { success: false, message: "Error while uploading image" + error };
    }

    // uploading all data to database
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: result.data.name,
                img: uploadResult?.secure_url,
                imgId: uploadResult?.public_id,
            }),
        });

        if (!response.ok) {
            return { success: false, message: "Error while adding category" };
        }
        revalidateTag('category')
        return { success: true, message: "Category added successfully" };

    } catch (error) {
        return { success: false, message: "Something went wrong !" + error };
    }
};

export default CategoryAddAction
