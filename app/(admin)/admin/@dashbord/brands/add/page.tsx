"use client";

import React from 'react';
import Link from 'next/link';
import BrandAddAction from '@/lib/Actions/BrandAddAction';

const BrandAdd = () => {

  return (
    <>
    <div className='flex gap-5 items-center mb-3'>
        <Link href="/admin/brands" className='bg-primary text-white py-2 px-6 rounded-lg'>back</Link>
        <h2 className='text-blue text-4xl font-bold'>Brand</h2>
      </div>
      <form action={BrandAddAction} className='flex flex-wrap gap-5'>
        <input type="text" className='p-4 border grow' name="name" placeholder='name' required />
        <button type='submit' className='bg-primary py-2 px-7 rounded-lg text-white'>Add</button>
      </form>
    </>
  )
}

export default BrandAdd