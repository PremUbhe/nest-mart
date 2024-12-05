import React from 'react';

// components;
import CategoriesCard from "@/components/CategoriesCard";
import ProductCard from "@/components/ProductCard";
import Swipers from '@/components/Swiper';

// data
import { getProductData } from '@/lib/helpers/Products';

// type
import { productType } from '@/lib/helpers/Products';
import { sliderSchema } from '@/components/Swiper';

// images
import img1 from '@/public/sliders/banner-1.png'
import img2 from '@/public/sliders/banner-2.png'
import img3 from '@/public/sliders/banner-3.png'

const swiperData: sliderSchema[] = [
  {
    name: "Everyday Fresh & Clean with Our Products",
    img: img1
  },
  {
    name: "Make your Breakfast Healthy and Easy",
    img: img2
  },
  {
    name: "The best Organic Products Online",
    img: img3
  },
  {
    name: "Everyday Fresh & Clean with Our Products",
    img: img1
  },
]

const Page = async () => {

  const productData = await getProductData();

  return (
    <main>
      {/* swiper section start */}
      <section>
        <Swipers params={swiperData} />
      </section>
      {/* category section start */}
      <section>
        <div className="section-header">
          <h2 className="text-3xl text-blue font-bold mb-5">Shop by Categories</h2>
        </div>
        <CategoriesCard />
      </section>
      {/* category section end */}
      {/* products section start */}
      <section>
        <div className="section-header">
          <h2 className="text-3xl text-blue font-bold mb-5">Popular Products</h2>
        </div>
        <div className="flex flex-wrap">
          {productData.map((data: productType, index: number) => {
            return <ProductCard params={data} key={index} />
          })}
        </div>
      </section>
      {/* products section end */}
    </main>
  )
}

export default Page