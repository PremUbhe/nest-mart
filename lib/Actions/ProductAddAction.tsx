'use server';
import { z } from 'zod';
import cloudinary from '@/lib/cloudinary';
import { revalidateTag } from 'next/cache'
import dbConnect from '../dbConnect';
import { ProductModel } from '../Models/Product';

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

type ApiResponse = {
  success: boolean,
  message: string,
}

const ProductAddAction = async (formData: FormData): Promise<ApiResponse> => {

  const formValues = Object.fromEntries(formData);
  const result = productSchema.safeParse(formValues);

  if (!result.success) {
    return { success: false, message: "Validation failed" + result.error };
  }

  // checking if name already exists
  try {
    await dbConnect();

    const name = result.data.name
    const res = await ProductModel.findOne({ name });

    if (res) {
      return { success: false, message: "Product name already exists" }
    }

  } catch (error) {
    return { success: false, message: "Error while checking product name" + error };
  }

  // img upload to cloudinary
  let uploadResult;

  try {
    const img = result.data.img;
    const buffer = Buffer.from(await img.arrayBuffer());

    uploadResult = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'NestMart/Products'
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result as { public_id: string; secure_url: string });
        }
      );
      stream.end(buffer);
    });
  } catch (error) {
    return { success: false, message: "Error while uploading image:" + error };
  }

  // add data to database
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: result.data.name,
        img: uploadResult?.secure_url,
        imgId: uploadResult?.public_id,
        category: result.data.category,
        brand: result.data.brand,
        price: Number(result.data.price),
        discount: Number(result.data.discount),
        rating: Number(result.data.rating),
        stock: Number(result.data.stock),
        description: result.data.description,
      }),
    });

    if (!response.ok) {
      return { success: false, message: "Error while adding Product" };
    }

    revalidateTag('products');
    return { success: true, message: "Product added successfully:" };

  } catch (error) {
    return { success: false, message: "Something went wrong !" + error };
  }
};

export default ProductAddAction