"use client";

import React from 'react'
import Image from 'next/image'
import login from '@/public/login-1.png'
import Link from 'next/link';


const page = () => {

    
    return (
        <main>
            <section className='container'>
                <div className="flex gap-5 max-w-3xl mx-auto">
                    <div className="w-6/12">
                        <Image className='rounded-lg' src={login} alt='Log In'></Image>
                    </div>
                    <div className="w-6/12">
                        <h2 className='text-4xl'>Login</h2>
                        <p className='mb-5'>Don&apos;t have an account? <Link className='text-primary' href="/register">Create here</Link></p>
                        <form action="">
                            <div className="mb-3">
                                <input className='p-4 border border-border-color rounded-lg w-full' type="text" name='userName' id='userName' placeholder='Username or Email *' required />
                            </div>
                            <div className="mb-3">
                                <input className='p-4 border border-border-color rounded-lg w-full' type="password" name='password' id='password' placeholder='Your Password *' required />
                            </div>
                            <div className="mb-7 text-center">
                                <Link className='text-primary' href="/forgotPassword">Forgot password?</Link>
                            </div>
                            <button className='py-3 px-10 bg-primary rounded-lg text-white' type='submit'>Log in</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default page