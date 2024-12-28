export type categoryType = {
    _id: string;
    name: string;
    img: string;
}

// category data
export async function GetCategoryData(): Promise<categoryType[]> {

    const categoryAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
        {
            headers: { Accept: "application/json", },
            method: "GET",
            cache: "no-store",
            next: { tags: ['category'] },
        }
    )

    if (!categoryAPI.ok) {
        throw new Error(`Category API call failed with status ${categoryAPI.status}`)
    }

    const categoryData = await categoryAPI.json()

    return categoryData.data
}

// category ID data
export async function GetCategoryIdData(id: string): Promise<categoryType> {

    const categoryAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`,
        {
            headers: { Accept: "application/json", },
            method: "GET",
            next: { tags: ['category'] },
        }
    )

    if (!categoryAPI.ok) {
        throw new Error(`Category ID API call failed with status ${categoryAPI.status}`)
    }

    const categoryData = await categoryAPI.json()

    return categoryData.data
}


// DETETE Category By ID
export async function DeleteCategoryById(id: string) {

    const categoryAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`,
        {
            headers: { Accept: "application/json", },
            method: "DELETE",
            next: { tags: ['category'] },
        }
    )

    if (!categoryAPI.ok) {
        throw new Error(`Category ID API call failed with status ${categoryAPI.status}`)
    }

    return categoryAPI.json()
}