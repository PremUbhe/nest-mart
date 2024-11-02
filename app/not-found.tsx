import Link from 'next/link'
import Image from 'next/image'
import Img from '@/public/page-404.png'

export default function NotFound() {
    return (
        <section className='flex flex-col items-center'>
            <Image src={Img} alt='404 Page'></Image>
            <h2 className='text-banner'>Page Not Found</h2>
            <p className='mb-5 text-gray'>The link you clicked may be broken or the page may have been removed.</p>
            <Link className='py-2 px-7 bg-primary rounded-lg text-white' href="/home">Return Home</Link>
        </section>
    )
}