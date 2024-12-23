import React from 'react'
import { columns } from "./columns"
import { DataTable } from "./data-table"

import { GetUserData } from '@/lib/ApiFunctions/User';
import { GetProductById } from '@/lib/ApiFunctions/Products';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';


const Cart = async () => {

    const session = await getServerSession(authOptions);

    const userId : string = await session?.user.id

    const user = await GetUserData(userId)

    const cart = user?.cart

    const cartData = await Promise.all(
        
        cart.map(async(data)=>{
    
            const productData = await GetProductById(data.productId)
    
            return {
                productId : data.productId,
                productName : productData.name,
                productImg : productData.img,
                productPrice : productData.price,
                productDiscount : productData.discount,
                productQuantity : data.quantity
            }
        })
    );

    return (
        session ? (
            <section>
                <div className="flex gap-5 items-center">
                    <div className="w-8/12">
                            <DataTable columns={columns} data={ await cartData} />
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
            </section >
        ) : (
            <section>
                user required
            </section>
        )
    )
}

export default Cart