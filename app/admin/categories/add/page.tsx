"use client";

import React from 'react';
import Link from 'next/link';

// hooks
import { useToast } from "@/hooks/use-toast"

// components
import CategoryAddAction from '@/lib/Actions/CategoryAddAction';

// icons
import { FaCircleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const CategoryAdd = () => {

  const { toast } = useToast()

  return (
    <>
      <div className='flex gap-5 items-center mb-3'>
        <Link href="/admin/categories" className='bg-primary text-white p-2 rounded-lg'><FaCircleLeft /></Link>
        <h2 className='text-blue text-2xl font-bold'>Add Category</h2>
      </div>
      <form action={CategoryAddAction} className='flex flex-col flex-wrap gap-5'>
        <input type="text" className='p-4 border grow' name="name" placeholder='name' required />
        <input type="file" className='p-4 border grow' name="img" placeholder='image' required />
        <button type='submit'
          className='flex gap-2 items-center w-28 bg-primary py-2 px-7 rounded-lg text-white'
          onClick={() => {
            toast({
              title: "Category Data",
              description: "adding to datat base",
            })
          }}> <FaPlus /> Add
        </button>
      </form>

    </>
  )
}

export default CategoryAdd