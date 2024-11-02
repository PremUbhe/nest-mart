import React from 'react';
import Image from 'next/image';
import About from '@/public/about-1.png';

const page = () => {
  return (
    <>
    <section className='container'>
      <div className="flex gap-10">
        <div className="w-6/12">
          <Image src={About} className='rounded-lg' alt='about img' placeholder='blur'/>
        </div>
        <div className="w-6/12">
        <h1 className='text-4xl text-blue font-bold mb-5'>Welcome to Nest</h1>
        <p className='text-text-secondary mb-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate id est laborum.</p>
        <p className='text-text-secondary mb-3'>Ius ferri velit sanctus cu, sed at soleat accusata. Dictas prompta et Ut placerat legendos interpre.Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante Etiam sit amet orci eget. Quis commodo odio aenean sed adipiscing. Turpis massa tincidunt dui ut ornare lectus. Auctor elit sed vulputate mi sit amet. Commodo consequat. Duis aute irure dolor in reprehenderit in voluptate id est laborum.</p>
        </div>
      </div>
    </section>
    </>
  )
}

export default page