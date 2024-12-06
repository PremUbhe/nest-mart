import React from 'react'

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


// products data
export async function getProductData(): Promise<productType[]> {

  const productsAPI = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
    {
      headers: { Accept: "application/json", },
      method: "GET",
      next: { tags: ['products'] },
    }
  )

  if (!productsAPI.ok) {
    throw new Error(`Product API call failed with status ${productsAPI.status}`)
  }

  const productData = await productsAPI.json()

  return productData.data
}


// products by id data
export async function getProductById(id: string): Promise<productType> {

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

const Products = () => {
  return (
    <div>Products</div>
  )
}

export default Products