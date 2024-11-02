"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import forgotPassword from '@/public/icons/forgot_password.svg'
import Link from 'next/link';


const Page = () => {

    const router = useRouter()

    return (
        <main>
            <section className='container'>
                <div className="max-w-md mx-auto">
                    <Image className='mb-5' src={forgotPassword} alt='Forgot Password'></Image>
                    <h2 className='text-4xl'>Forgot your password?</h2>
                    <p className='mb-5 text-gray'>Not to worry, we got you! Let’s get you a new password. Please enter your email address or your Username.</p>
                    <form action="">
                        <div className="mb-5">
                            <input className='p-4 border border-border-color rounded-lg w-full' type="text" name='userName' id='userName' placeholder='Username or Email *' required />
                        </div>
                        <div className="mb-7 flex justify-between">
                            <div className="flex items-center">
                                <input className='w-4 h-4 me-1 accent-black' type="checkbox" name='termsPolicy' id='termsPolicy' />
                                <label htmlFor="termsPolicy">I agree to terms & Policy.</label>
                            </div>
                            <Link className='text-primary' href="#">Lean more</Link>
                        </div>
                        <button className='py-3 px-10 bg-primary rounded-lg text-white' type='submit' onClick={() => router.push('/resetPassword')}>Reset password</button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Page