import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from "@/public/logo.svg";

const Default = () => {
  return (
    <header className='p-4 flex justify-between items-center border-b border-border-color'>
      <Link href="/home">
        <Image src={logo} alt='logo' />
      </Link>
      <div className="flex gap-3">
        <h1 className='text-3xl'>Dashbord</h1>
      </div>
    </header>
  )
}

export default Default