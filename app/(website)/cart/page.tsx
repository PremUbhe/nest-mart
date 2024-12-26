import React from 'react'
import { columns } from "./columns"
import { DataTable } from "./data-table"
import Link from 'next/link';

import { getUserById } from '@/lib/ApiFunctions/User';
import { GetProductById } from '@/lib/ApiFunctions/Products';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { Button } from '@/components/ui/button';


const Cart = async () => {

    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <div className="flex flex-col justify-center items-center min-h-80 p-5 border shadow-lg rounded-lg m-5 border-primary">
                <h2 className="text-4xl font-semibold text-blue mb-4">User LogIn Required !</h2>
                <Link className='py-2 px-6 rounded-lg font-semibold text-white bg-primary hover:bg-secondary hover:text-blue' href="/login">Log In</Link>
            </div>
        )
    }

    const userId: string = await session.user.id

    const user = await getUserById(userId)

    if (!user) {
        return <h2>Somthing whent Wrong ! </h2>
    }

    const cart = user?.cart

    const cartData = await Promise.all(

        cart.map(async (data) => {

            const productData = await GetProductById(data.productId)

            return {
                productId: data.productId,
                productName: productData.name,
                productImg: productData.img,
                productPrice: productData.price,
                productDiscount: productData.discount,
                productQuantity: data.quantity
            }
        })
    );

    const totalValue = cartData.reduce((total, item) => {
        const price = item.productPrice * item.productQuantity;
        return total + price;
    }, 0);

    const discount = cartData.reduce((total, item) => {
        const price = item.productPrice * item.productQuantity * item.productDiscount / 100;
        return total + price;
    }, 0);
    
    const formattedDiscount = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(discount)

    const formattedTotalValue = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(totalValue)

    const discountValue = cartData.reduce((total, item) => {
        const discountedPrice = item.productPrice * (1 - item.productDiscount / 100);
        const itemTotal = discountedPrice * item.productQuantity;
        return total + itemTotal;
    }, 0);

    const formattedDiscountedValue = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(discountValue)

    return (
        session ? (
            <section>
                <div className="flex gap-5 items-center">
                    <div className="w-8/12">
                        <DataTable columns={columns} data={await cartData} />
                    </div>
                    <div className="w-4/12">
                        <div className="border border-border-color rounded-lg p-4 shadow-lg">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className='text-gray font-semibold text-lg'>Subtotal</h4>
                                <h3 className='text-primary font-bold text-xl'>{formattedTotalValue}</h3>
                            </div>
                            <hr className='mb-3' />
                            <div className="border rounded-lg p-2 mb-3">
                                <div className="flex justify-between items-center pb-2 border-b">
                                    <h4 className='text-gray font-semibold text-lg'>Shipping</h4>
                                    <h3 className='text-lg font-semibold'>Free</h3>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <h4 className='text-gray font-semibold text-lg'>Estimate for</h4>
                                    <h3 className='text-lg font-semibold'>India</h3>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <h4 className='text-gray font-semibold text-lg'>Discount</h4>
                                    <h3 className='text-lg font-semibold text-secondary'>{formattedDiscount}</h3>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <h4 className='text-gray font-semibold text-xl'>Total</h4>
                                    <h3 className='text-primary font-bold text-2xl'>{formattedDiscountedValue}</h3>
                                </div>
                            </div>
                            <Button variant="outline" size="lg" type='button' className='bg-primary text-md font-bold text-white w-full hover:bg-secondary hover:text-white'>Proceed To CheckOut</Button>
                        </div>
                    </div>
                </div>
            </section >
        ) : (
            <section>
                Login required
            </section>
        )
    )
}

export default Cart