"use server"
import React from 'react';

// tabel components
import { columns } from "./columns"
import { DataTable } from "./data-table"

// data
import { getProductData } from '@/lib/ApiFunctions/Products';

// type
import { productType } from '@/lib/ApiFunctions/Products';


const ProductList = async () => {

  const productData = await getProductData();

    if (productData.data) {
      return (
        <div className="container mx-auto">
          <DataTable columns={columns} data={productData.data as productType[]} />
        </div>
      )
    } else {
      return <div> <h2>{productData.message}</h2></div>;
    }
}

export default ProductList