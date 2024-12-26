'use client';
import React from 'react'
import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';

// components
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

// hook
import { useToast } from '@/hooks/use-toast';

// function
import { updateUserCart } from "@/lib/ApiFunctions/UserCart";

// icons
import { FaCartShopping } from "react-icons/fa6";
import { PiHeartLight } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const AddCartSection = ({stock, productId, quantityCount} : {stock : number, productId: string, quantityCount: number}) => {

  const { data: session } = useSession();
  const { toast } = useToast()
  
  const userId: string = session?.user.id
  
  const [quantity, setQuantity] = useState<number>(quantityCount);
  const [isPending, startTransition] = useTransition();
  
  const params = {userId, productId, quantity}
  
  const addCartAction = () => {
    startTransition(() => {

      updateUserCart({ params })
        .then((data) => {
          if (data?.success) {

            toast({
              title: "Done",
              description: `${data?.message}`,
            })

          } else {

            toast({
              variant: "destructive",
              title: "Fail",
              description: `${data?.message}`,
            })
          }
        });
    });
  }

  return (
    <>
      <div className="flex gap-3 my-5">
        <Button variant="outline" className='shadow hover:bg-primary-light hover:text-primary' size="icon" onClick={() => quantity < stock ? setQuantity(quantity + 1) : null}><FaPlus /></Button>
        <Input type="text" className='shadow w-20' onChange={(e) => setQuantity(Number(e.target.value))} value={quantity} />
        <Button variant="outline" className='shadow hover:bg-primary-light hover:text-primary' size="icon" onClick={() => quantity > 1 ? setQuantity(quantity - 1) : null}><FaMinus /></Button>
        <Button className='shadow flex gap-2 items-center bg-primary text-white hover:bg-secondary hover:text-white' disabled={session === null || isPending} variant="ghost" onClick={() => addCartAction()}><FaCartShopping /> Add to cart</Button>
        <Button variant="outline" className='shadow hover:bg-primary-light hover:text-primary' size="icon"><PiHeartLight /></Button>
      </div>
    </>
  )
}

export default AddCartSection