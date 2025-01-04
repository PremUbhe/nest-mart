'use server'
import { revalidateTag } from "next/cache";
import cloudinary from "../cloudinary";

export type productType = {
  _id: string;
  name: string;
  img: string;
  imgId: string,
  price: number;
  rating: number;
  discount: number;
  category: string;
  brand: string;
  stock: number;
  description: string;
}

type ApiResponses = {
  success: boolean,
  message: string,
  data?: productType[]
}
type ApiResponse = {
  success: boolean,
  message: string,
  data?: productType
}

// products data
export async function getProductData(): Promise<ApiResponses> {

  try {
    const productsAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      {
        headers: { Accept: "application/json", },
        method: "GET",
        cache: "no-store",
        next: { tags: ['products'] },
      }
    );

    if (!productsAPI.ok) {
      return { success: false, message: `Product API call failed with status ${productsAPI.status}` };
    }

    const productData = await productsAPI.json();

    return { success: true, message: "Product Data found", data: productData.data };

  } catch (error) {
    return { success: false, message: `Something went wrong! : ${error}` };
  }
};

// products by id data
export async function getProductById(id: string): Promise<ApiResponse> {

  try {
    const productsAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
      {
        headers: { Accept: "application/json", },
        method: "GET",
        next: { tags: ['products'] },
      }
    );

    if (!productsAPI.ok) {
      return { success: false, message: `Product API call failed with status ${productsAPI.status}` };
    }

    const productData = await productsAPI.json();

    return { success: true, message: "Product Data found", data: productData.data };

  } catch (error) {
    return { success: false, message: `Something went wrong! : ${error}` };
  }
};

// delete product by id
export async function deleteProductById(id: string, imgId: string): Promise<ApiResponse> {

  if (!id) {
    return { success: false, message: "Product ID is required.", };
  }

  try {

    if (imgId) {
      const deleteImgResult = await cloudinary.uploader.destroy(imgId);
      if (deleteImgResult.result !== 'ok') {
        return { success: false, message: "Failed to delete image from Cloudinary." };
      }
    }

    const productsAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
      {
        headers: { Accept: "application/json", },
        method: "DELETE",
        cache: "no-store",
        next: { tags: ['products'] },
      }
    )

    if (!productsAPI.ok) {
      return { success: false, message: `Product API call failed with status ${productsAPI.status}` }
    }

    const res = await productsAPI.json();

    if (res.success) {
      revalidateTag('products')
      return { success: true, message: "Product Deleted Successfully" };

    } else {
      return { success: false, message: res.message }
    }

  } catch (error) {

    return { success: false, message: 'Something went wrong !' + error };
  }
};