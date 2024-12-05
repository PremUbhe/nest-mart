import React from 'react';
import Link from 'next/link';

// components
import { Button } from '@/components/ui/button';
import DeleteBrandBut from '@/components/DeleteBrandBut';

// type
import { brandType } from '@/lib/helpers/brands';

// data
import { getBrandData } from '@/lib/helpers/brands';

// icons
import { FaPencil } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";


const BrandList = async () => {

  const BrandsData = await getBrandData();

  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-blue text-3xl font-bold'>Brand List</h2>
        <Button type='submit' variant="outline"
          className='bg-primary text-white hover:bg-primary-light hover:text-primary hover:border-primary'>
          <Link href="/admin/brands/add" className='flex gap-2 items-center'> <FaPlus /> Add</Link>
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>SR No.</th>
            <th>Brand Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {BrandsData.map((value: brandType, index: number,) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{value.name}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin/brands/add/${value._id}`} className='p-2 text-white bg-yellow-500 rounded-lg' type='button'><FaPencil /></Link>
                    <DeleteBrandBut params={value} />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default BrandList