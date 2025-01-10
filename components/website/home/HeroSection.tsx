'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// img
import img1 from "@/public/sliders/slider-5.png"
import img2 from "@/public/sliders/slider-6.png"

export type sliderSchema = {
    heading: string,
    subHeading: string,
    img: StaticImageData
}

const data: sliderSchema[] = [
    {
        heading: "Fresh Vegetables Big discount",
        subHeading: "Save up to 50% off on your first order",
        img : img1
    },
    {
        heading: "Don’t miss amazing deals",
        subHeading: "Sign up for the daily newsletter",
        img : img2
    },

]

const HeroSection = () => {

  return (
    <div >
        <Swiper
        className='swiper'
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={true}
        loop={true}
        pagination={{ clickable: true }}
        >
            {data.map((data: sliderSchema, index: number)=>{
                return (
                    <SwiperSlide key={index} className='relative'>
                        <div className="swiper-card relative flex flex-col justify-center items-center overflow-hidden p-10 min-h-[500px]">
                            <Image className='absolute top-0 left-0 w-full h-full object-cover' src={data.img} placeholder="blur" alt="bg img" />
                            <h3 className='text-5xl md:text-banner text-center relative text-blue font-bold leading-none max-w-screen-sm mb-3'>{data.heading}</h3>
                            <p className='text-xl text-center relative text-gray font-semibold max-w-screen-sm'>{data.subHeading}</p>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    </div>
  )
}

export default HeroSection