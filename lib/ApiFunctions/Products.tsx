export type productType = {
  _id: string;
  name: string;
  img: string;
  price: number;
  rating: number;
  discount: number;
  category: string;
  brand: string;
  stock: number;
  description: string;
}

type ApiResponse = {
  success: boolean,
  message: string,
  data?: productType[]
}

// products data
export async function getProductData(): Promise<ApiResponse> {

  try {
    const productsAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      {
        headers: { Accept: "application/json", },
        method: "GET",
        cache: "no-store",
        next: { tags: ['products'] },
      }
    )

    if (!productsAPI.ok) {
      return { success: false, message: `Product API call failed with status ${productsAPI.status}` }
    }

    const productData = await productsAPI.json()

    return { success: true, message: "Product Data found", data: productData.data }

  } catch (error) {
    return { success: false, message: `Something went wrong! : ${error}` }
  }
}

// products by id data
export async function GetProductById(id: string): Promise<productType> {

  const productsAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    {
      headers: { Accept: "application/json", },
      method: "GET",
      next: { tags: ['products'] },
    }
  )

  if (!productsAPI.ok) {
    throw new Error(`Product ID API call failed with status ${productsAPI.status}`)
  }

  const productData = await productsAPI.json()

  return productData.data
}