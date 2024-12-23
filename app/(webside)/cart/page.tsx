'use client';
import React from 'react'
import { columns } from "./columns"
import { DataTable } from "./data-table"

import { useSession } from 'next-auth/react';


const Cart = () => {

    const { data: session } = useSession();

    const userCart = session?.user.cart

    return (
        <section>
            <h1 className='text-4xl text-blue font-bold'>Your Cart</h1>
            <div className="flex gap-5">
                <div className="w-8/12">
                    <div className="flex justify-between">
                        <h6 className='text-gray'>There are <span className='text-primary'>3</span> products in your cart</h6>
                        <button className='text-gray' type='button'>Clear Cart</button>
                    </div>
                    <div className="my-5">
                        <DataTable columns={columns} data={userCart} />
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="border border-border-color rounded-lg p-4 shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className='text-gray text-xl'>Subtotal</h4>
                            <h3 className='text-primary text-2xl'>$12.31</h3>
                        </div>
                        <hr className='mb-3' />
                        <div className="border p-2 mb-3">
                            <div className="flex justify-between items-center pb-2 mb-3 border-b">
                                <h4 className='text-gray text-xl'>Shipping</h4>
                                <h3 className='text-xl'>Free</h3>
                            </div>
                            <div className="flex justify-between items-center pb-2 mb-2 border-b">
                                <h4 className='text-gray text-xl'>Estimate for</h4>
                                <h3 className='text-xl'>United Kingdom</h3>
                            </div>
                            <div className="flex justify-between items-center">
                                <h4 className='text-gray text-xl'>Total</h4>
                                <h3 className='text-primary text-2xl'>$12.31</h3>
                            </div>
                        </div>
                        <button type='button' className='bg-primary text-center text-white py-3 w-full rounded-lg hover:bg-secondary'>Proceed To CheckOut</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart