'use client'
import React from 'react';
import Link from 'next/link';

// action
import BrandAddAction from '@/lib/Actions/BrandAddAction';

// components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// icons
import { FaCircleLeft } from "react-icons/fa6";

const BrandAdd = () => {

  return (
    <>
      <div className='flex gap-5 items-center mb-3'>
        <Button variant="outline" size="icon" className='bg-primary text-white hover:bg-primary-light hover:text-primary hover:border-primary'>
          <Link href="/admin/brands" ><FaCircleLeft /></Link>
        </Button>
        <h2 className='text-blue text-4xl font-bold'>Brand</h2>
      </div>
      <form action={BrandAddAction} className='flex flex-wrap gap-5'>
        <Input type="text" className='w-full' name="name" placeholder='name' required />
        <Button type='submit' variant="outline" className='bg-primary text-white hover:bg-secondary hover:text-white'>Submit</Button>
      </form>
    </>
  )
}

export default BrandAdd