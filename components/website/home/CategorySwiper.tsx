'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// data
import { getCategoryData } from "@/lib/ApiFunctions/Category";

// type
import { categoryType } from "@/lib/ApiFunctions/Category";


const CategorySwiper = () => {

    const [categoryData, setCategoryData] = useState<categoryType[]>([])

    useEffect(() => {

        const fetchData = async () => {
            const data = await getCategoryData();
            if (data.success && data.data) {
                setCategoryData(data.data)
            }
        }
        fetchData();
    }, [])

    return (
        <div className='px-2 md:px-4'>
            <Swiper
                className='swiper'
                modules={[Navigation, Autoplay]}
                slidesPerView={2}
                spaceBetween={10}
                autoplay={true}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                    1440: {
                        slidesPerView: 7,
                        spaceBetween: 30,
                    },
                }}
            >
                {categoryData.map((data: categoryType, index: number) => {
                    return (
                        <SwiperSlide key={index} className='relative'>
                            <div
                                className="w-40 h-52 px-8 py-7 flex flex-col justify-center items-center border rounded-xl overflow-hidden hover:bg-white hover:shadow-lg hover:border-primary-light"
                                key={index}
                            >
                                <Image src={data.img} alt="img" width={80} height={80}></Image>
                                <h3 className="text-blue text-center mt-5 font-bold">{data.name}</h3>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}

export default CategorySwiper