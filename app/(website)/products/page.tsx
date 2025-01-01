import React from 'react';

// data
import { getProductData } from '@/lib/ApiFunctions/Products';

// components
import ProductCard from "@/components/website/products/ProductCard";
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



// type
import { productType } from '@/lib/ApiFunctions/Products';


const page = async () => {

  const productData = await getProductData();

  return (
    <>
      <section className='m-4 py-16 rounded-lg bg-[url("/header-bg.png")] bg-cover'>
        <div className="container">
          <div className="flex justify-between items-center">
            <h1 className='text-4xl text-blue font-bold'>Products</h1>
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
          {productData.data?.map((data: productType, index: number) => {
            return (
              <div className="product-card-wrapper xl:w-3/12 lg:w-4/12 md:w-6/12 sm:12/12 px-3" key={index}>
                <ProductCard params={data} />
              </div>
            )
          })}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

        </div>
      </section>
    </>
  )
}

export default page