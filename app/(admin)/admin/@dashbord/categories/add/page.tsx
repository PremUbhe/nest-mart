"use client";

import React from 'react';
import Link from 'next/link';
import CategoryAddAction from '@/lib/Actions/CategoryAddAction';

const CategoryAdd = () => {

  return (
    <>
    <div className='flex gap-5 items-center mb-3'>
        <Link href="/admin/categories" className='bg-primary text-white py-2 px-6 rounded-lg'>back</Link>
        <h2 className='text-blue text-4xl font-bold'>Category</h2>
      </div>
      <form action={CategoryAddAction} className='flex flex-wrap gap-5'>
        <input type="text" className='p-4 border grow' name="name" placeholder='name' required />
        <input type="text" className='p-4 border grow' name="imgURL" placeholder='imgURL' required />
        <button type='submit' className='bg-primary py-2 px-7 rounded-lg text-white'>Add</button>
      </form>
    </>
  )
}

export default CategoryAdd