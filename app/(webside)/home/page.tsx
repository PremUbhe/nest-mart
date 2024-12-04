import React from 'react';

// components;
import CategoriesCard from "@/components/CategoriesCard";
import ProductCard from "@/components/ProductCard";

// data
import { getProductData } from '@/lib/helpers/products';

// type
import { productType } from '@/lib/helpers/products';

const Page = async () => {

  const productData = await getProductData();

  return (
    <main>
      <section>
        <div className="section-header">
          <h2 className="text-2xl text-blue font-bold mb-5">Shop by Categories</h2>
        </div>
        <CategoriesCard />
      </section>
      <section>
        <div className="section-header">
          <h2 className="text-2xl text-blue font-bold mb-5">Popular Products</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {productData.map((data: productType, index: number) => {
            return <ProductCard params={data} key={index} />
          })}
        </div>
      </section>
    </main>
  )
}

export default Page