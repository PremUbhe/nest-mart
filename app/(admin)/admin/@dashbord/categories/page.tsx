import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// icons
import { FaPencil } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import DeleteBut from '@/components/DeleteBut';

// type
import { categoryType } from '@/lib/helpers/category';

const CategoryList = async () => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    }
  );
  const CategorieData = await res.json();

  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-blue text-3xl font-bold'>Category List</h2>
        <Link href="/admin/categories/add" className='flex gap-2 items-center bg-primary text-white py-2 px-4 rounded-lg'> <FaPlus /> Add</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>SR No.</th>
            <th>Category Image</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {CategorieData.data.map((value: categoryType, index: number,) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.img ? <Image className='text-center' src={value.img} alt='img' width={50} height={50}></Image> : "img"}</td>
                <td>{value.name}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin/categories/add/${value._id}`} className='p-2 text-white bg-yellow-500 rounded-lg' type='button'><FaPencil /></Link>
                    <DeleteBut/>
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

export default CategoryList