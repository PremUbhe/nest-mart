import React from 'react';
import Image, { StaticImageData } from "next/image";

// icons
import { TbMail } from "react-icons/tb";
import { IoCallOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { WiTime4 } from "react-icons/wi";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

// img
import logo from '@/public/logo.svg'
import banner2 from "@/public/banner-3.png";
import icon1 from "@/public/icons/icon-1.svg";
import icon2 from "@/public/icons/icon-2.svg";
import icon3 from "@/public/icons/icon-3.svg";
// import icon4 from "@/public/icons/icon-4.svg";
import icon5 from "@/public/icons/icon-5.svg";

type cardDataType = {
  img: StaticImageData,
  header: string,
  description: string,
}

const cartdData: cardDataType[] = [
  {
    img: icon1,
    header: 'Best prices & offers',
    description: 'Orders $50 or more'
  },
  {
    img: icon2,
    header: 'Free delivery',
    description: '24/7 amazing services'
  },
  {
    img: icon3,
    header: 'Great daily deal',
    description: 'When you sign up'
  },
  // {
  //   img: icon4,
  //   header: 'Wide assortment',
  //   description: 'Mega Discounts'
  // },
  {
    img: icon5,
    header: 'Easy returns',
    description: 'Within 30 days'
  },
]


const Default = () => {
  return (
    <>
      <section className='relative m-4 py-16 h-[450px] rounded-lg bg-[url("/banner-footer.png")] bg-cover'>
        <div className="container h-full">
          <div className="flex h-full">
            <div className="w-full lg:w-6/12 p-7 md:p-0 h-full flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl text-blue font-bold leading-tight mb-4">
                Stay home & <br /> get your daily needs<br />
                from our shop
              </h1>
              <p className="mb-65 text-xl font-semibold text-gray">
                Start You&apos;r Daily Shopping with
                <span className="text-primary"> Nest Mart</span>
              </p></div>
            <div className="w-6/12 hidden lg:block">
              <Image
                className="absolute bottom-0 right-10 max-w-2xl"
                src={banner2}
                placeholder="blur"
                alt="bg"
                height={350}
              ></Image>
            </div>
          </div>
        </div>
      </section>

      <section className='pt-0'>
        <div className="flex items-center flex-wrap mt-3">
          {
            cartdData.map((data, index) => {
              return (
                <div className="min-w-72 w-full xl:w-3/12 md:w-6/12 sm:w-full p-2" key={index}>
                  <div className="card bg-light-blue p-4 rounded-xl shadow">
                    <div className="flex gap-3 items-center">
                      <Image src={data.img} height={60} width={60} alt="icon"></Image>
                      <div className="text-base">
                        <h5 className='font-medium text-lg'>{data.header}</h5>
                        <h5 className="text-gray text-sm">{data.description}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </section>

      <footer className="p-4 bg-[url('/banner.png')] bg-cover">
        <div className="container pt-10 px-auto">
          <div className="flex flex-wrap">
            <div className="w-full mb-5 lg:w-3/12 md:w-6/12 lg:w-6/12">
              <Image
                className="mb-4"
                src={logo}
                height={50}
                alt="Logo"
              />
              <h6 className="text-xl mb-3">Awesome grocery store website template</h6>
              <div className="flex gap-3">
                <FaFacebook />
                <FaInstagram />
                <FaXTwitter />
                <FaYoutube />
              </div>
            </div>
            <div className="w-full mb-5 lg:w-3/12 md:w-6/12 lg:w-6/12">
              <h2 className="text-2xl text-blue font-bold">Quick Links</h2>
              <ul className='ml-1'>
                <li className='text-sm font-medium mb-1'>Home</li>
                <li className='text-sm font-medium mb-1'>About Us</li>
                <li className='text-sm font-medium mb-1'>Cart</li>
                <li className='text-sm font-medium mb-1'>Products</li>
                <li className='text-sm font-medium mb-1'>Categories</li>
                <li className='text-sm font-medium mb-1'>Blogs</li>
                <li className='text-sm font-medium'>Contact Us</li>
              </ul>
            </div>
            <div className="w-full mb-5 lg:w-3/12 md:w-6/12 lg:w-6/12">
              <h2 className="text-2xl text-blue font-bold">Popular</h2>
              <ul className='ml-1'>
                <li className='text-sm font-medium mb-1'>Milk & Flavoured Milk</li>
                <li className='text-sm font-medium mb-1'>Butter and Margarine</li>
                <li className='text-sm font-medium mb-1'>Eggs Substitutes</li>
                <li className='text-sm font-medium mb-1'>Marmalades</li>
                <li className='text-sm font-medium mb-1'>Sour Cream and Dips</li>
                <li className='text-sm font-medium mb-1'>Tea & Kombucha</li>
                <li className='text-sm font-medium'>Cheese</li>
              </ul>
            </div>
            <div className="w-full mb-5 lg:w-3/12 md:w-6/12 lg:w-6/12">
              <h2 className="text-2xl text-blue font-bold">Contact Us</h2>
              <ul className='ml-1'>
                <li className='flex gap-1 flex-wrap items-center text-sm font-medium mb-1'><IoLocationOutline /> <b>Address :</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, ea!</li>
                <li className='flex gap-1 items-center text-sm font-medium mb-1'><IoCallOutline /> <b>Call Us :</b> (+91) - 123 456 7890</li>
                <li className='flex gap-1 items-center text-sm font-medium mb-1'><TbMail /> <b>Email :</b> sale@Nest.com</li>
                <li className='flex gap-1 items-center text-sm font-medium mb-1'><WiTime4 /> <b>Hours :</b> 10:00 - 18:00, Mon - Sat</li>
              </ul>
            </div>
          </div>
          <hr className="text-primary my-4" />
          <div className="flex justify-center">
            <p>© 2024, <span className="text-primary">Nest Market</span> | All rights reserved By <span className="text-primary">Prem Ubhe</span></p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Default