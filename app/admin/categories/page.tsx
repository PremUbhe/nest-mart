import React from 'react';

// components
import { columns } from "./columns"
import { DataTable } from "./data-table"

// data
import { GetCategoryData } from '@/lib/ApiFunctions/Category';

const CategoryList = async () => {

  const CategorieData = await GetCategoryData();

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={CategorieData} />
    </div>
  )
}

export default CategoryList