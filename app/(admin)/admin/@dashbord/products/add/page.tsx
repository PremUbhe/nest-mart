'use client';

import React from 'react';
import Link from 'next/link';
// action
import ProductAddAction from '@/lib/Actions/ProductAddAction';
// components
import CategorySelectList from '@/components/CategorySelectList';
import BrandSelectList from '@/components/BrandSelectList';
// ui
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
// icons
import { FaCircleLeft } from "react-icons/fa6";


const ProductAdd = () => {

    return (
        <>
            <div className='flex gap-5 items-center mb-3'>
                <Link href="/admin/products" className='bg-primary text-white p-2 rounded-lg'><FaCircleLeft /></Link>
                <h2 className='text-blue text-2xl font-bold'>Add Product</h2>
            </div>
            <form action={ProductAddAction} className='flex flex-wrap'>
                <div className="w-6/12 pe-3 mb-5">
                    <Input type="text" className=' w-full' name="name" placeholder='name' required />
                </div>
                <div className="w-6/12 ps-3 mb-5">
                    <Input type="file" className='pt-[6px] w-full' name="img" placeholder='image' required />
                </div>
                <div className="w-6/12 pe-3 mb-5">
                    <CategorySelectList />
                </div>
                <div className="w-6/12 ps-3 mb-5">
                    <BrandSelectList />
                </div>
                <div className="w-3/12 pe-3 mb-5">
                    <Input type="number" className='w-full' name='price' placeholder='Price' required />
                </div>
                <div className="w-3/12 px-3 mb-5">
                    <Input type="number" className='w-full' name='discount' placeholder='Discount' required />
                </div>
                <div className="w-3/12 px-3 mb-5">
                    <Input type="number" className='w-full' name='rating' placeholder='Rating' required />
                </div>
                <div className="w-3/12 ps-3 mb-5">
                    <Input type="number" className='w-full' name='stock' placeholder='Avalabel Stock' required />
                </div>
                <div className="w-full mb-5">
                    <Textarea name="description" className='border w-full' id="description" placeholder='Description' rows={4}></Textarea>
                </div>
                <Button type='submit' variant="outline"
                    className='bg-primary-light hover:bg-primary hover:text-white'>
                    Submit
                </Button>
            </form>
        </>
    )
}

export default ProductAdd