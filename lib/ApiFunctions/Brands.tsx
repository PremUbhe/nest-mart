'use server'

export type brandType = {
    _id: string;
    name: string
}

// GET brand data
export async function getBrandData(): Promise<brandType[]> {

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
            throw new Error(`Brand API call failed with status ${brandAPI.status}`)
        }
    
        const brandData = await brandAPI.json()
    
        return brandData.data

    } catch (error) {
        throw new Error(`Something went wrong! : ${error}`)
    }

}


// GET Brand By ID
export async function GetBrandById(id: string): Promise<brandType> {

    const brandAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands/${id}`,
        {
            headers: { Accept: "application/json", },
            method: "GET",
            next: { tags: ['brand'] },
        }
    )

    if (!brandAPI.ok) {
        throw new Error(`Brand ID API call failed with status ${brandAPI.status}`)
    }

    const brandData = await brandAPI.json()

    return brandData.data
}

type ApiResponse = {
    success : boolean,
    message : string,
    data ? : {name: string;}
}

// DETETE Brand By ID
export async function deleteBrandById(id: string) : Promise<ApiResponse> {

    try {
        const brandAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands/${id}`,
            {
                headers: { Accept: "application/json", },
                method: "DELETE",
                next: { tags: ['brand'] },
            }
        )
    
        const res = await brandAPI.json()

        return res
        
    } catch (error) {
        return {success: false, message: 'Something went wrong !' + error}
    }

}