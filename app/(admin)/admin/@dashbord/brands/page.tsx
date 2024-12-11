import React from 'react';
import Link from 'next/link';
import { columns } from "./columns"
import { DataTable } from "./data-table"

// components
import { Button } from '@/components/ui/button';

// data
import { GetBrandData } from '@/lib/ApiFunctions/Brands';

// icons
import { FaPlus } from "react-icons/fa6";


const BrandList = async () => {

  const BrandsData = await GetBrandData();

  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-blue text-3xl font-bold'>Brand List</h2>
        <Button type='submit' variant="outline"
          className='bg-primary text-white hover:bg-primary-light hover:text-primary hover:border-primary'>
          <Link href="/admin/brands/add" className='flex gap-2 items-center'> <FaPlus /> Add</Link>
        </Button>
      </div>
      <div className="container mx-auto">
        <DataTable columns={columns} data={BrandsData} />
      </div>
    </>
  )
}

export default BrandList