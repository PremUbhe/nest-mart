'use server'
import React from 'react';
import { columns } from "./columns"
import { DataTable } from "./data-table"

// data
import { brandType, getBrandData } from '@/lib/ApiFunctions/Brands';

const page = async () => {

  const brandsData = await getBrandData();

  if (brandsData.data) {
    return (
      <div className="container mx-auto">
        <DataTable columns={columns} data={brandsData.data as brandType[]} />
      </div>
    )
  } else {
    return <div> <h2>{brandsData.message}</h2></div>;
  }
}

export default page