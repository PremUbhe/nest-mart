import React from 'react';
import NavLinks from "@/components/NavLinks";


const Default = () => {
  return (
    <nav className="sticky top-0 py-2 px-4 bg-white border-b border-primary-light shadow z-50">
      <div className="flex justify-between">
          <div className="flex gap-10 items-center">
            <button className='bg-primary text-white py-2 px-7 rounded-lg' type='button'>Browse All Categories</button>
            <NavLinks />
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <h3 className='text-primary text-2xl font-bold'>1900 - 888</h3>
              <p className='text-gray text-sm'>24/7 Support Center</p>
            </div>
          </div>
      </div>
    </nav>
  )
}

export default Default