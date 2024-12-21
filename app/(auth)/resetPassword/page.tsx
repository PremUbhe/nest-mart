"use client";

import React from 'react'
import Image from 'next/image'
import resetPassword from '@/public/icons/reset_password.svg'

const ResetPassword = () => {

    return (
        <main>
            <section className='container'>
                <div className="max-w-3xl mx-auto">
                    <Image className='mb-5' src={resetPassword} alt='Reset Password'></Image>
                            <h2 className='text-4xl'>Set new password</h2>
                    <div className="flex gap-5">

                        <div className="w-7/12">
                            <p className='mb-5 text-gray'>Please create a new password that you don’t use on any other site.</p>
                            <form action="">
                                <div className="mb-3">
                                    <input className='p-4 border border-border-color rounded-lg w-full' type="password" name='password' id='password' placeholder='Password *' required />
                                </div>
                                <div className="mb-3">
                                    <input className='p-4 border border-border-color rounded-lg w-full' type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirm your Password *' required />
                                </div>
                                <button className='py-3 px-10 bg-primary rounded-lg text-white' type='submit'>Reset password</button>
                            </form>
                        </div>
                        <div className="w-5/12">
                            <h5 className='text-base'>Password must:</h5>
                            <p className='text-gray text-sm'>Be between 9 and 64 characters <br /> Include at least tow of the following:</p>
                            <ul className='list-disc ms-4 text-gray text-sm'>
                                <li>An uppercase character</li>
                                <li>A lowercase character</li>
                                <li>A number</li>
                                <li>A special character</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ResetPassword