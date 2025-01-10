'use server'
import { revalidateTag } from "next/cache";


export type brandType = {
    _id: string;
    name: string
}

type ApiResponses = {
    success: boolean,
    message: string,
    data?: brandType[]
}
type ApiResponse = {
    success: boolean,
    message: string,
    data?: brandType
}

// Get brand data
export async function getBrandData(): Promise<ApiResponses> {

    try {
        const brandAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands`, {
            headers: { Accept: "application/json", },
            method: "GET",
            cache: "no-store",
            next: { tags: ['brand'] },
        });

        if (!brandAPI.ok) {
            return { success: false, message: `Brand API call failed with status ${brandAPI.status}` };
        }

        const brandData = await brandAPI.json();

        return { success: true, message: "Brand Data found", data: brandData.data };

    } catch (error) {
        return { success: false, message: `Something went wrong! : ${error}` };
    }

}

// Get Brand By ID
export async function getBrandById(id: string): Promise<ApiResponse> {

    if (!id) {
        return { success: false, message: "Brand ID is required" }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands/${id}`, {
            headers: { Accept: "application/json", },
            method: "GET",
            cache: "force-cache",
            next: { tags: ['brand'] },
        });

        if (!response.ok) {
            return { success: false, message: "Brand not found.", };
        }

        const brandData = await response.json();
        return { success: true, message: "Brand Data found", data: brandData.data };

    } catch (error) {
        return { success: false, message: 'Something went wrong !' + error };
    }
}


// Update Brand By ID
export async function updateBrandById({params} : {params : {id : string, name : string}}): Promise<ApiResponse> {

    const {id, name} = params;

    if (!id) {
        return { success: false, message: "Brand ID is required" };
    }

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands/${id}`, {
            headers: { Accept: "application/json", },
            method: "DELETE",
            next: { tags: ['brand'] },
            body: JSON.stringify(name)
        });

        if (!response.ok) {
            return { success: false, message: "Brand not found" };
        }

        revalidateTag('brand')
        return { success: true, message: "Brand Updated Successfully" };

    } catch (error) {
        return { success: false, message: 'Something went wrong !' + error };
    }
}

// Delete Brand By ID
export async function deleteBrandById(id: string): Promise<ApiResponse> {

    if (!id) {
        return { success: false, message: "Brand ID is required" };
    }

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands/${id}`, {
            headers: { Accept: "application/json", },
            method: "DELETE",
            next: { tags: ['brand'] },
        });

        if (!response.ok) {
            return { success: false, message: "Brand not found" };
        }

        revalidateTag('brand')
        return { success: true, message: "Brand Deleted Successfully" };

    } catch (error) {
        return { success: false, message: 'Something went wrong !' + error };
    }
}