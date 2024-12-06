import React from 'react';
import Image, { StaticImageData } from 'next/image';

// components
import AboutSlider from '@/components/AboutSlider';

// image
import About from '@/public/about/about-1.png';
import performanceImg from '@/public/about/about-5.png'
import img1 from '@/public/icons/icon-1.svg'
import img2 from '@/public/icons/icon-2.svg'
import img5 from '@/public/icons/icon-5.svg'
import img3 from '@/public/icons/icon-3.svg'
import img4 from '@/public/icons/icon-4.svg'
import img6 from '@/public/icons/icon-6.svg'

// type 
type providerDataType = {
  img: StaticImageData;
  name: string;
  description: string;
}


const providerData: providerDataType[] = [
  {
    img: img1,
    name: 'Best Prices & Offers',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
  },
  {
    img: img4,
    name: 'Wide Assortment',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
  },
  {
    img: img3,
    name: 'Free Delivery',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
  },
  {
    img: img5,
    name: 'Easy Returns',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
  },
  {
    img: img2,
    name: '100% Satisfaction',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
  },
  {
    img: img6,
    name: 'Great Daily Deal',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
  },

]

const page = () => {
  return (
    <>
      {/* Hero section start */}
      <section className='container'>
        <div className="flex gap-10">
          <div className="w-6/12">
            <Image src={About} className='rounded-lg' alt='about img' placeholder='blur' />
          </div>
          <div className="w-6/12">
            <h1 className='text-4xl text-blue font-bold mb-5'>Welcome to Nest</h1>
            <p className='text-text-secondary text-justify mb-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate id est laborum.</p>
            <p className='text-text-secondary text-justify mb-3'>Ius ferri velit sanctus cu, sed at soleat accusata. Dictas prompta et Ut placerat legendos interpre.Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante Etiam sit amet orci eget. Quis commodo odio aenean sed adipiscing. Turpis massa tincidunt dui ut ornare lectus. Auctor elit sed vulputate mi sit amet. Commodo consequat. Duis aute irure dolor in reprehenderit in voluptate id est laborum.</p>
            <AboutSlider />
          </div>
        </div>
      </section>
      {/* Hero section end */}
      {/* Provide section start */}
      <section className='container'>
        <h2 className="text-blue text-4xl text-center font-bold pb-5 mb-3 bg-wave bg-no-repeat bg-bottom">What We Provide?</h2>
        <div className="flex flex-wrap">
          {providerData.map((data: providerDataType, index: number) => {
            return (
              <div className="provider-wrapper lg:w-4/12 md:w-6/12 sm:w-full" key={index}>
                <div className="provider-card m-3 p-14 border shadow-lg rounded-xl text-center">
                  <Image className='mx-auto mb-5' src={data.img} height={100} width={100} alt='img'></Image>
                  <h3 className='text-2xl mb-3 text-blue font-semibold'>{data.name}</h3>
                  <p className='text-sm text-gray'>{data.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      {/* Provide section end */}
      {/* Performance dection start */}
      <section className='container pb-20'>
        <div className="flex">
          <div className="w-7/12">
            <Image src={performanceImg} className='w-full h-auto' alt='performance Image'></Image>
          </div>
          <div className="w-5/12 p-4 ms-5">
            <h5 className='text-2xl text-gray font-semibold'>Our performance</h5>
            <h2 className='text-5xl text-blue font-bold mb-5'>Your Partner for e-commerce grocery solution</h2>
            <p className='text-md text-gray mb-3 text-justify'>Ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto</p>
            <p className='text-md text-gray mb-3 text-justify'>Pitatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia</p>
          </div>
        </div>
        <div className="flex mt-5">
          <div className="w-4/12 p-4">
            <h3 className='text-3xl text-blue font-semibold mb-2'>Who we are</h3>
            <p className='text-sm text-gray text-justify'>Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in. ellus eros donec ac odio orci ultrices in.</p>
          </div>
          <div className="w-4/12 p-4">
            <h3 className='text-3xl text-blue font-semibold mb-2'>Our history</h3>
            <p className='text-sm text-gray text-justify'>Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in. ellus eros donec ac odio orci ultrices in.</p>
          </div>
          <div className="w-4/12 p-4">
            <h3 className='text-3xl text-blue font-semibold mb-2'>Our mission</h3>
            <p className='text-sm text-gray text-justify'>Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in. ellus eros donec ac odio orci ultrices in.</p>
          </div>
        </div>
      </section>
      {/* Performance dection end */}
    </>
  )
}

export default page