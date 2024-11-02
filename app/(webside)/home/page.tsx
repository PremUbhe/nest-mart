import React from 'react';

// import Image from "next/image";
import CategoriesCard from "@/components/CategoriesCard";
import ProductCard from "@/components/ProductCard";

export type productType = {
  _id: string;
  name: string;
  img: string;
  price: number;
  rating: number;
  discount: number;
  categorie_id: string;
  brand_id: string;
  stock: number;
  description: string;
}



const Page = async () => {

  const productsAPI = await fetch(
    `${process.env.BASE_URL}/api/products`,
    {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    }
  );

  if (!productsAPI.ok) {
    throw new Error(`API call failed with status ${productsAPI.status}`)
  }
  const productData = await productsAPI.json();

  return (
    <main>
      <section>
        <div className="section-header">
          <h2 className="text-2xl">Shop by Categories</h2>
        </div>
        <CategoriesCard />
      </section>
      <section>
        <div className="section-header">
          <h2 className="text-2xl">Popular Products</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {productData.data.map((data: productType, index: string) => {
            return <ProductCard params={data} key={index} />
          })}
        </div>
      </section>
    </main>
  )
}

export default Page