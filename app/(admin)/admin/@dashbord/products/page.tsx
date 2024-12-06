import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';

// data
// import { getProductData } from '@/lib/Helpers/Products';
// import { getCategoryIdData } from '@/lib/Helpers/Category';
// import { getBrandById } from '@/lib/Helpers/Brands';

// type
// import { productType } from '@/lib/Helpers/Products';

// icons
// import { FaPencil } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

// components
import { Button } from '@/components/ui/button';
// import DeleteBut from '@/components/DeleteBut';


const ProductList = async () => {

  // const productData = await getProductData();

  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-blue text-3xl font-bold'>Products List</h2>
        <Button type='submit' variant="outline"
          className='bg-primary-light hover:bg-primary hover:text-white'>
          <Link href="/admin/products/add" className='flex gap-2 items-center'> <FaPlus /> Add</Link>
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>SR No.</th>
            <th>Products Image</th>
            <th>Products Name</th>
            <th>Category</th>
            <th>Brand</th>
            {/* <th>Products Rating</th> */}
            <th>Products Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {productData.map(async (value: productType, index: number,) => {

            const categoryData = await getCategoryIdData(value.category);
            const brandData = await getBrandById(value.brand)

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.img ? <Image className='text-center' src={value.img} alt='img' width={50} height={50}></Image> : "img"}</td>
                <td>{value.name}</td>
                <td>{categoryData.name}</td>
                <td>{brandData.name}</td>
                <td>{value.price}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin/categories/add/${value._id}`} className='p-2 text-white bg-yellow-500 rounded-lg' type='button'><FaPencil /></Link>
                    <DeleteBut />
                  </div>
                </td>
              </tr>
            )
          })} */}
        </tbody>
      </table>
    </>
  )
}

export default ProductList