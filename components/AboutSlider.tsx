'use client';
import React from 'react'
import Image, { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// images
import img1 from "@/public/about/about-2.png"
import img2 from "@/public/about/about-3.png"
import img3 from "@/public/about/about-4.png"

export type sliderType = {
    img: StaticImageData
}

const sliderData: sliderType[] = [
    {img: img1},
    {img: img2},
    {img: img3},
    {img: img2},
]

const AboutSlider = () => {
    return (
        <Swiper
            className='about-swiper'
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            autoplay={true}
            loop={true}
        >
            {sliderData.map((data: sliderType, index: number) => {
                return (
                    <SwiperSlide key={index} className='relative'>
                        <div className="swiper-card relative p-10 rounded-xl aspect-[3/4]">
                            <Image className='absolute top-0 left-0 w-full h-full' src={data.img} placeholder="blur" alt="bg img" />
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    )
}

export default AboutSlider