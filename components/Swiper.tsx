'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// icons
import { FaArrowRightLong } from "react-icons/fa6";

type slider = {
    name: string,
    img: string
}


const Swipers = ({ params }: { params: slider[] }) => {

  return (
    <div className='my-10'>
        <Swiper
        className='swiper'
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        // navigation
        autoplay={true}
        loop={true}
        pagination={{ clickable: true }}
        >
            {params.map((data: slider, index: number)=>{
                return (
                    <SwiperSlide key={index} className='relative '>
                        <div className="swiper-card p-10 rounded-xl aspect-[5/3]">
                            <Image className='absolute top-0 left-0 w-full h-full' src={data.img}placeholder="blur" alt="bg img" />
                            <h3 className='text-xl font-semibold absolute top-16 left-10 w-44'>{data.name}</h3>
                            <button className='absolute bottom-16 left-10 bg-primary text-white'> Shop Now <FaArrowRightLong className='ms-3'/> </button>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    </div>
  )
}

export default Swipers