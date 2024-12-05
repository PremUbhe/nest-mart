'use server';
import { z } from 'zod';
import cloudinary from '@/lib/cloudinary';
import { revalidateTag } from 'next/cache'

const productSchema = z.object({
  name: z.string(),
  img: z.instanceof(File),
  category: z.string(),
  brand: z.string(),
  price: z.string(),
  discount: z.string(),
  rating: z.string(),
  stock: z.string(),
  description: z.string(),
})

const ProductAddAction = async (formData: FormData) => {

  const formValues = Object.fromEntries(formData);
  const result = productSchema.safeParse(formValues);
  console.log(result);

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
      throw new Error("No data found for the image upload.")
    }
  } catch (error) {
    console.error("Error while uploading image:", error);
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: result.data.name,
        img: uploadResult?.secure_url,
        category: result.data.category,
        brand: result.data.brand,
        price: Number(result.data.price),
        discount: Number(result.data.discount),
        rating: Number(result.data.rating),
        stock: Number(result.data.stock),
        description: result.data.description,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Product added successfully:", data);

      revalidateTag('products');

    } else {
      const errorData = await response.json();
      console.error("Error adding Product:", errorData);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

export default ProductAddAction