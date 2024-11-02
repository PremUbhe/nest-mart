import React from 'react';
import Image from 'next/image';
import logo from "@/public/logo.svg";

const Default = () => {
  return (
    <header className='p-4 flex justify-between items-center border-b border-border-color'>
      <Image src={logo} alt='logo' />
      <div className="flex gap-3">
        <h1 className='text-3xl'>Dashbord</h1>
      </div>
    </header>
  )
}

export default Default