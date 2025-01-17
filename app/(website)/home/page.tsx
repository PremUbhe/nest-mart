import React from 'react';

// components;
import ProductCard from "@/components/website/products/ProductCard";
import Swipers from '@/components/website/swiper/Swiper';
import HeroSection from '@/components/website/home/HeroSection';
import CategorySwiper from '@/components/website/home/CategorySwiper';

// data
import { getProductData } from '@/lib/ApiFunctions/Products';

// type
import { productType } from '@/lib/ApiFunctions/Products';
import { sliderSchema } from '@/components/website/swiper/Swiper';

// images
import img1 from '@/public/sliders/banner-1.png'
import img2 from '@/public/sliders/banner-2.png'
import img3 from '@/public/sliders/banner-3.png'
import img4 from '@/public/sliders/banner-4.png'

const swiperData: sliderSchema[] = [
  {
    name: "Fresh Vegetables Big discount",
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
    img: img4
  },
]

const Page = async () => {

  const productData = await getProductData();

  return (
    <main>
      {/* Hero section start */}
      <section className='p-0'>
        <HeroSection  />
      </section>
      {/* Hero section end */}

      {/* swiper section start */}
      <section>
        <Swipers params={swiperData} />
      </section>
      {/* swiper section end */}

      {/* category section start */}
      <section className='py-0'>
        <div className="section-header">
          <h2 className="text-3xl text-blue font-bold mb-5">Shop by Categories</h2>
        </div>
        <CategorySwiper />
      </section>
      {/* category section end */}

      {/* products section start */}
      <section>
        <div className="section-header">
          <h2 className="text-3xl text-blue font-bold mb-5">Popular Products</h2>
        </div>
        <div className="flex flex-wrap">
          {productData.data?.map((data: productType, index: number) => {
            return (
              <div className="product-card-wrapper xl:w-3/12 lg:w-4/12 md:w-6/12 sm:12/12 p-3" key={index}>
                <ProductCard params={data} />
              </div>
            )
          })}
        </div>
      </section>
      {/* products section end */}
    </main>
  )
}

export default Page