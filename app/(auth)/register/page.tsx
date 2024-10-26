"use client";

import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <main>
      <section className='container'>
        <div className="flex gap-5 max-w-3xl mx-auto">
          <div className="w-6/12">
            <h2 className='text-4xl'>Create an Account</h2>
            <p className='mb-5'>Already have an account? <Link className='text-primary' href="/login">Login</Link></p>
            <form className='mb-5' action="">
              <div className="mb-3">
                <input className='p-4 border border-border-color rounded-lg w-full' type="text" name='userName' id='userName' placeholder='User Name *' required />
              </div>
              <div className="mb-3">
                <input className='p-4 border border-border-color rounded-lg w-full' type="email" name='email' id='email' placeholder='Email *' required />
              </div>
              <div className="mb-3">
                <input className='p-4 border border-border-color rounded-lg w-full' type="password" name='password' id='password' placeholder='Password *' required />
              </div>
              <div className="mb-3">
                <input className='p-4 border border-border-color rounded-lg w-full' type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirm Password *' required />
              </div>
              <div className="mb-7 flex justify-between">
                <div className="flex items-center">
                  <input className='w-4 h-4 me-1 accent-black' type="checkbox" name='termsPolicy' id='termsPolicy' />
                  <label htmlFor="termsPolicy">I agree to terms & Policy.</label>
                </div>
                <Link className='text-primary' href="#">Lean more</Link>
              </div>
              <button className='py-3 px-10 bg-primary rounded-lg text-white' type='submit'>Resgister</button>
            </form>
            <p className='text-gray text-sm'>Note:Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy</p>
          </div>
          <div className="w-6/12">
          <h1>third party login</h1>
          </div>
        </div>

      </section>
    </main>
  )
}

export default page