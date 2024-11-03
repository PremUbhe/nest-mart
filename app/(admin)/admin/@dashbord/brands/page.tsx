import React from 'react';
import Link from 'next/link';

export type brandType = {
  _id: string,
  name: string
}

const BrandList = async () => {

  const res = await fetch(
    `${process.env.BASE_URL}/api/brands`,
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
        <h2 className='text-blue text-4xl font-bold'>Brand List</h2>
        <Link href="/admin/brands/add" className='bg-primary text-white py-2 px-6 rounded-lg' >Add</Link>
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
          {CategorieData.data.map((value : brandType, index : number,)=>{
            return (
              <tr key={index}>
                <td>{index}</td>
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

export default BrandList