"use client";

import React from 'react';
import Link from 'next/link';
import CategoryAddAction from '@/lib/Actions/CategoryAddAction';

// icons
import { FaCircleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { string } from 'zod';

const CategoryAdd = ({ params }: { params: { id: string } }) => {

    const CategoryID = params.id

    return (
        <>
            <h1>add id</h1>
            {/* <div className='flex gap-5 items-center mb-3'>
        <Link href="/admin/categories" className='bg-primary text-white p-2 rounded-lg'><FaCircleLeft /></Link>
        <h2 className='text-blue text-2xl font-bold'>Add Category</h2>
      </div>
      <form action={CategoryAddAction} className='flex flex-col flex-wrap gap-5'>
        <input type="text" className='p-4 border grow' name="name" value={params.id} placeholder='name' required />
        <input type="file" className='p-4 border grow' name="img" placeholder='image' required />
        <button type='submit' className='flex gap-2 items-center w-28 bg-primary py-2 px-7 rounded-lg text-white'> <FaPlus/> Add</button>
      </form> */}
        </>
    )
}

export default CategoryAdd