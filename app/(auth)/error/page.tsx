import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const AuthErrorPage = () => {
  return (
    <section className="w-full h-screen bg-primary flex justify-center items-center">
        <div className="flex flex-col items-center gap-5 max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-xl">
            <h2 className='text-3xl text-blue font-bold '>Oops! Something went Wrong!</h2>
            <Link href="/login">
                <Button variant="link" size="lg" className='text-semibold'>Back to login</Button>
            </Link>
        </div>
    </section>
  )
}

export default AuthErrorPage