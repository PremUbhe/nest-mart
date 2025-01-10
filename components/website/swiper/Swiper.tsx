'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// components
import { Button } from '@/components/ui/button';

// icons
import { FaArrowRightLong } from "react-icons/fa6";


export type sliderSchema = {
    name: string,
    img: StaticImageData
}


const Swipers = ({ params }: { params: sliderSchema[] }) => {

    return (
        <div >
            <Swiper
                className='swiper'
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                spaceBetween={30}
                // navigation
                autoplay={true}
                loop={true}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
            >
                {params.map((data: sliderSchema, index: number) => {
                    return (
                        <SwiperSlide key={index} className='relative'>
                            <div className="swiper-card relative p-10 overflow-hidden rounded-xl aspect-[5/3]">
                                <Image className='absolute top-0 left-0 object-cover aspect-[5/3]' src={data.img} placeholder="blur" alt="bg img" />
                                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-5 xl:px-10 gap-4">
                                    <h3 className='text-xl font-semibold w-44'>{data.name}</h3>
                                    <Link href="/products">
                                        <Button className='bg-primary text-white'> Shop Now <FaArrowRightLong /></Button>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}

export default Swipers