import React from 'react';

// data
import { getProductData } from '@/lib/helpers/Products';
import { getCategoryData } from '@/lib/helpers/Category';

// components
import ProductCard from "@/components/ProductCard";

// type
import { productType } from '@/lib/helpers/Products';
import { categoryType } from '@/lib/helpers/Category';


const page = async () => {

  const productData = await getProductData();

  const CategorieData = await getCategoryData();


  return (
    <>
      <section className='m-4 py-16 rounded-lg bg-[url("/header-bg.png")] bg-cover'>
        <div className="container">
          <div className="flex justify-between items-center">
            <h1 className='text-4xl text-blue font-bold'>Products</h1>
            <input type="text" className='py-2 px-4 w-96 border rounded-xl border-primary' placeholder='Search...' />
          </div>
        </div>
      </section>
      <section className='flex gap-5'>
        <div className="w-3/12">
          <div className="p-4 border rounded-xl mb-5 shadow">
            <h4 className='text-xl text-blue font-bold mb-5'>By Categories</h4>
            <ul className='flex flex-col gap-3'>
              {CategorieData.map((value: categoryType, index: number) => {
                return <li className='font-semibold border rounded-lg py-2 px-4 hover:shadow hover:border-primary' key={index}>{value.name}</li>
              })}
            </ul>
          </div>
          <div className="p-4 border rounded-xl shadow">
            <h4 className='text-xl text-blue font-bold'>By Price</h4>
          </div>
        </div>
        <div className="w-9/12">
          <div className="flex flex-wrap gap-3">
            {productData.map((data: productType, index: number) => {
              return <ProductCard params={data} key={index} />
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default page