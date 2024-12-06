import React from 'react';
import Image from "next/image";

// components
import NavLinks from "@/components/NavLinks";

// img
import logo from '@/public/logo.svg'
import banner2 from "@/public/banner-3.png";
import icon1 from "@/public/icons/icon-1.svg";
import icon2 from "@/public/icons/icon-2.svg";
import icon3 from "@/public/icons/icon-3.svg";
import icon4 from "@/public/icons/icon-4.svg";
import icon5 from "@/public/icons/icon-5.svg";


const Default = () => {
  return (
    <>
      <section className='relative m-4 py-16 h-[450px] rounded-lg bg-[url("/banner-footer.png")] bg-cover'>
        <div className="container h-full">
          <div className="flex h-full">
            <div className="w-6/12 h-full flex flex-col justify-center">
              <h1 className="text-4xl text-blue font-bold leading-none mb-4">
                Stay home & get your daily <br />
                needs from our shop
              </h1>
              <p className="mb-65 text-xl text-gray">
                Start You&apos;r Daily Shopping with
                <span className="text-primary font-medium"> Nest Mart</span>
              </p></div>
            <div className="w-6/12">
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
        <div className="flex gap-4 mt-3">
          <div className="card p-5 bg-light-blue rounded-xl shadow">
            <div className="flex gap-3 items-center">
              <Image src={icon1} height={60} width={60} alt="icon"></Image>
              <div className="text-base">
                <h5 className='font-medium text-lg'>Best prices & offers</h5>
                <h5 className="text-gray">Orders $50 or more</h5>
              </div>
            </div>
          </div>
          <div className="card p-5 bg-light-blue rounded-xl shadow">
            <div className="flex gap-3 items-center">
              <Image src={icon2} height={60} width={60} alt="icon"></Image>
              <div className="text-base">
                <h5 className='font-medium text-lg'>Free delivery</h5>
                <h5 className="text-gray">24/7 amazing services</h5>
              </div>
            </div>
          </div>
          <div className="card p-5 bg-light-blue rounded-xl shadow">
            <div className="flex gap-3 items-center">
              <Image src={icon3} height={60} width={60} alt="icon"></Image>
              <div className="text-base">
                <h5 className='font-medium text-lg'>Great daily deal</h5>
                <h5 className="text-gray">When you sign up</h5>
              </div>
            </div>
          </div>
          <div className="card p-5 bg-light-blue rounded-xl shadow">
            <div className="flex gap-3 items-center">
              <Image src={icon4} height={60} width={60} alt="icon"></Image>
              <div className="text-base">
                <h5 className='font-medium text-lg'>Wide assortment</h5>
                <h5 className="text-gray">Mega Discounts</h5>
              </div>
            </div>
          </div>
          <div className="card p-5 bg-light-blue rounded-xl shadow">
            <div className="flex gap-3 items-center">
              <Image src={icon5} height={60} width={60} alt="icon"></Image>
              <div className="text-base">
                <h5 className='font-medium text-lg'>Easy returns</h5>
                <h5 className="text-gray">Within 30 days</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="p-4 bg-[url('/banner.png')] bg-cover">
        <div className="container pt-10 px-auto">
          <div className="flex gap-10">
            <div className="w-3/12">
              <Image
                className="mb-4"
                src={logo}
                height={50}
                alt="Logo"
              />
              <h6 className="text-xl">Awesome grocery store website template</h6>
            </div>
            <div className="w-3/12">
              <h2 className="text-2xl text-blue font-bold">Quick Links</h2>
              <div className="flex flex-col ms-5">
                <NavLinks />
              </div>
            </div>
            <div className="w-3/12">
              <h2 className="text-2xl text-blue font-bold">Contact Us</h2>
            </div>
            <div className="w-3/12">
              {/* <h2 className="text-2xl">Quick Links</h2> */}
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