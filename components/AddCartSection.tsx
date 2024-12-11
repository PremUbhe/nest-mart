'use client';
import React from 'react'
import { useState } from 'react';

// components
import { Button } from './ui/button';
import { Input } from './ui/input';

// icons
import { FaCartShopping } from "react-icons/fa6";
import { PiHeartLight } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";


const AddCartSection = (params : {stock : number}) => {

    const [count, setCount] = useState<number>(1);

  return (
    <>
    <div className="flex gap-3 my-5">
        <Button variant="outline" className='shadow hover:bg-primary-light hover:text-primary' size="icon" onClick={()=> count < params.stock ? setCount(count + 1) : null}><FaPlus /></Button>
        <Input type="text" className='shadow w-20' onChange={(e)=> setCount(Number(e.target.value))} value={count} />
        <Button variant="outline" className='shadow hover:bg-primary-light hover:text-primary' size="icon" onClick={()=> count > 1 ? setCount(count - 1) : null}><FaMinus /></Button>
        <Button className='shadow flex gap-2 items-center bg-primary text-white hover:bg-secondary hover:text-white' variant="ghost"><FaCartShopping/> Add to cart</Button>
        <Button variant="outline" className='shadow hover:bg-primary-light hover:text-primary' size="icon"><PiHeartLight /></Button>
    </div>
    </>
  )
}

export default AddCartSection