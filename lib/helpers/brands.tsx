export type brandType = {
    _id: string;
    name: string
}


// brand data
export async function getBrandData() {

    const productsAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands`,
        {
            headers: { Accept: "application/json", },
            method: "GET",
            next: { tags: ['brand'] },
        }
    )

    if (!productsAPI.ok) {
        throw new Error(`Brand API call failed with status ${productsAPI.status}`)
    }

    return productsAPI.json()
}


// Brand ID data
export async function getBrandIdData(id: string): Promise<brandType> {

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