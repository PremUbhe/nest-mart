'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// components
import { Button } from './ui/button';

// icons
import { FaArrowRightLong } from "react-icons/fa6";


export type sliderSchema = {
    name: string,
    img: StaticImageData
}


const Swipers = ({ params }: { params: sliderSchema[] }) => {

  return (
    <div className=''>
        <Swiper
        className='swiper'
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        // navigation
        autoplay={true}
        loop={true}
        pagination={{ clickable: true }}
        >
            {params.map((data: sliderSchema, index: number)=>{
                return (
                    <SwiperSlide key={index} className='relative'>
                        <div className="swiper-card relative p-10 rounded-xl aspect-[5/3]">
                            <Image className='absolute top-0 left-0 w-full h-full' src={data.img} placeholder="blur" alt="bg img" />
                            <h3 className='text-xl font-semibold absolute top-16 left-10 w-44'>{data.name}</h3>
                            <Button className='absolute bottom-16 left-10 bg-primary text-white'> Shop Now <FaArrowRightLong/></Button>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    </div>
  )
}

export default Swipers