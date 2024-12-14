export type brandType = {
    _id: string;
    name: string
}

// GET brand data
export async function GetBrandData(): Promise<brandType[]> {

    const brandAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands`,
        {
            headers: { Accept: "application/json", },
            method: "GET",
            cache: "force-cache",
            next: { tags: ['brand'] },
        }
    )

    if (!brandAPI.ok) {
        throw new Error(`Brand API call failed with status ${brandAPI.status}`)
    }

    const brandData = await brandAPI.json()

    return brandData.data
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


// DETETE Brand By ID
export async function DeleteBrandById(id: string) {

    const brandAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands/${id}`,
        {
            headers: { Accept: "application/json", },
            method: "DELETE",
            next: { tags: ['brand'] },
        }
    )

    if (!brandAPI.ok) {
        throw new Error(`Brand ID API call failed with status ${brandAPI.status}`)
    }

    return brandAPI.json()
}