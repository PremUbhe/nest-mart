import React from 'react';
import Link from 'next/link';

export type categoreType = {
  _id: string,
  name: string
}

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
        <h2 className='text-blue text-4xl font-bold'>Category List</h2>
        <Link href="/admin/categories/add" className='bg-primary text-white py-2 px-6 rounded-lg' >Add</Link>
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
          {CategorieData.data.map((value: categoreType, index: number,) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>img</td>
                <td>{value.name}</td>
                <td>edit, delete</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default CategoryList