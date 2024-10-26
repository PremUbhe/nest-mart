import React from 'react'
import Image from 'next/image'
import loader from '@/public/loading.gif'


const loading = () => {
  return (
    <div className='fixed flex left-0 top-0 h-screen w-full items-center justify-center z-50 bg-white'>
        <Image src={loader} alt='loading ...' unoptimized/>
    </div>
  )
}

export default loading