import React from 'react';

// data
import { GetProductData } from '@/lib/ApiFunctions/Products';

// components
import ProductCard from "@/components/website/products/ProductCard";
import { Input } from '@/components/ui/input';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// icons
import { TbHome } from "react-icons/tb";

// type
import { productType } from '@/lib/ApiFunctions/Products';


const page = async () => {

  const productData = await GetProductData();

  return (
    <>
      <section className='m-4 py-16 rounded-lg bg-[url("/header-bg.png")] bg-cover'>
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="">
              <h1 className='text-4xl mb-3 text-blue font-bold'>Category</h1>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/home"><h4 className='flex items-center gap-1 text-sm'><TbHome /> Home</h4></BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/categories"><h4 className='flex items-center gap-1 text-sm'>Category</h4></BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage><h4 className='text-sm '>Snaks</h4></BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Input type="text" className='w-96' placeholder='Search for Products...' />
          </div>
        </div>
      </section>
      <section className='py-0 mx-4'>
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold text-gray">We found <span className='text-primary'>29</span> items for you!</h3>
          <div className="flex gap-5">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Show" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="150">150</SelectItem>
                <SelectItem value="200">200</SelectItem>
                <SelectItem value="all">all</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="high-low">Price: High to Low</SelectItem>
                <SelectItem value="low-high">Price: Low to High</SelectItem>
                <SelectItem value="release-date">Release Date</SelectItem>
                <SelectItem value="rating">Avg. Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-wrap">
          {productData.map((data: productType, index: number) => {
            return (
              <div className="product-card-wrapper xl:w-3/12 lg:w-4/12 md:w-6/12 sm:12/12 px-3" key={index}>
                <ProductCard params={data} />
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default page