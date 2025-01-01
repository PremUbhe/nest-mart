import { revalidateTag } from "next/cache";


export type categoryType = {
    _id: string;
    name: string;
    img: string;
}

type ApiResponses = {
    success: boolean,
    message: string,
    data?: categoryType[]
}

type ApiResponse = {
    success: boolean,
    message: string,
    data?: categoryType
}

// category data
export async function getCategoryData(): Promise<ApiResponses> {

    try {
        const categoryAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
            {
                headers: { Accept: "application/json", },
                method: "GET",
                cache: "no-store",
                next: { tags: ['category'] },
            }
        )
    
        if (!categoryAPI.ok) {
            return { success: false, message: `Category API call failed with status ${categoryAPI.status}` }
        }
    
        const categoryData = await categoryAPI.json()
    
        return { success: true, message: "Category Data found" , data: categoryData.data }
        
    } catch (error) {
        return { success: false, message: `Something went wrong! : ${error}` }
    }

}

// category ID data
export async function getCategoryId(id: string): Promise<ApiResponse> {

    if(!id) {
        return { success: false, message: "Category ID is required." , }
    }

    try {
        const categoryAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`,
            {
                headers: { Accept: "application/json", },
                method: "GET",
                next: { tags: ['category'] },
            }
        )
        
        if (!categoryAPI.ok) {
            return { success: false, message: "Category not found." }
        }

        const category = await categoryAPI.json();

        return { success: true, message: "Category found Successfully", data: category.data }

    } catch (error) {
        return { success: false, message: 'Something went wrong !' + error }
    }
}


// DETETE Category By ID
export async function deleteCategoryById(id: string): Promise<ApiResponse> {

    if(!id) {
        return { success: false, message: "Category ID is required." , }
    }

    try {
        const categoryAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`,
            {
                headers: { Accept: "application/json", },
                method: "DELETE",
            }
        )
    
        if (!categoryAPI.ok) {
            return { success: false, message: "Category not found." }
        }
        revalidateTag('category')
        return { success: true, message: "Category Deleted Successfully" }

    } catch (error) {
        return { success: false, message: 'Something went wrong !' + error }
    }

}