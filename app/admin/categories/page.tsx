'use server'
import React from 'react';

// components
import { columns } from "./columns"
import { DataTable } from "./data-table"

// data
import { getCategoryData, categoryType } from '@/lib/ApiFunctions/Category';

const CategoryList = async () => {

  const categorieData = await getCategoryData();

  if (categorieData.success) {
    return (
      <div className="container mx-auto">
        <DataTable columns={columns} data={categorieData.data as categoryType[]} />
      </div>
    );

  } else {
    return (
      <div className="container mx-auto">
        <h2>{categorieData.message}</h2>
      </div>
    );
  }

}

export default CategoryList