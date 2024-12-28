'use server'
import React from 'react';
import { columns } from "./columns"
import { DataTable } from "./data-table"

// data
import { getBrandData } from '@/lib/ApiFunctions/Brands';

const page = async () => {

  const BrandsData = await getBrandData();

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={BrandsData} />
    </div>
  )
}

export default page