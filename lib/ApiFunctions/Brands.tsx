'use server'
import dbConnect from "../dbConnect";
import { BrandModel } from "../Models/Brand";

export type brandType = {
    _id: string;
    name: string
}

type ApiResponse = {
    success: boolean,
    message: string,
    data?: brandType[]
}

// GET brand data
export async function getBrandData(): Promise<ApiResponse> {

    try {
        const brandAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands`,
            {
                headers: { Accept: "application/json", },
                method: "GET",
                cache: "no-store",
                next: { tags: ['brand'] },
            }
        )

        if (!brandAPI.ok) {
            return { success: false, message: `Brand API call failed with status ${brandAPI.status}` }
        }

        const brandData = await brandAPI.json()

        return { success: true, message: "Brand Data found" , data: brandData.data }

    } catch (error) {
        return { success: false, message: `Something went wrong! : ${error}` }
    }

}

// GET Brand By ID
export async function getBrandById(id: string) {

    try {

        if(!id) {
            return { success: false, message: "Brand ID is required." , }
        }

        await dbConnect();

        const brandData = await BrandModel.findById(id);

        if(!brandData) {
            return { success: false, message: "Brand not found." , }
        }
    
        return { success: true, message: "Brand Data found" , data: brandData }

    } catch (error) {
        return { success: false, message: 'Something went wrong !' + error }
    }
}


// DETETE Brand By ID
export async function deleteBrandById(id: string): Promise<ApiResponse> {

    try {
        
        if(!id) {
            return { success: false, message: "Brand ID is required." , }
        }

        await dbConnect();

        const res = await BrandModel.findByIdAndDelete(id);

        if (!res) {
            return { success: false, message: "Brand not found." }
        }

        return { success: true, message: "Brand Deleted Successfully" }

    } catch (error) {
        return { success: false, message: 'Something went wrong !' + error }
    }

}

// update
// const updatedBrand = await BrandModel.findByIdAndUpdate(
//     brandId,
//     name,
//     { new: true }
// );