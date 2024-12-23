import React from 'react';
import Image from 'next/image';
import Img from '@/public/contact-2.png'


const page = () => {
  return (
    <>
      <section className='container'>
        <div className="flex gap-10">
          <div className="w-4/12">
            <h4 className='text-primary font-bold text-2xl'>How can help you ?</h4>
            <h2 className='text-4xl text-blue font-bold leading-none mb-5'>Let us know how we can help you</h2>
            <p className='text-gray mb-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            <p className='text-gray'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
          <div className="w-4/12">
            <h4 className='text-xl font-semibold mb-5'>01. Visit Feedback</h4>
            <p className='text-gray mb-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            <h4 className='text-xl font-semibold mb-5'>03. Billing Inquiries</h4>
            <p className='text-gray'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
          <div className="w-4/12">
            <h4 className='text-xl font-semibold mb-5 '>02. Employer Services</h4>
            <p className='text-gray mb-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            <h4 className='text-xl font-semibold mb-5'>04. General Inquiries</h4>
            <p className='text-gray'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
        </div>
      </section>
      <section>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4024.3447143569992!2d73.85175531197018!3d18.520453514260772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1730555040097!5m2!1sen!2sin" width="100%" height="450" loading="lazy"></iframe>
      </section>
      <section className='container'>
        <div className="flex gap-10">
          <div className="w-8/12">
            <h4 className='text-primary font-semibold text-xl'>Contact form</h4>
            <h2 className='text-4xl font-bold'>Drop Us a Line</h2>
            <p className='text-gray mb-5'>Your email address will not be published. Required fields are marked *</p>

            <form action="">
              <div className='flex gap-5 mb-3'>
                <input className='grow p-4 border border-border-color rounded-lg' type="text" placeholder='First Name' required/>
                <input className='grow p-4 border border-border-color rounded-lg' type="email" placeholder='Your Email' required/>
              </div> 
              <div className='flex gap-5 mb-3'>
                <input className='grow p-4 border border-border-color rounded-lg' type="number" placeholder='Your Phone' required/>
                <input className='grow p-4 border border-border-color rounded-lg' type="text" placeholder='Subject' required />
              </div>
              <textarea className='w-full p-4 border border-border-color rounded-lg mb-3' name="message" id="message" placeholder='Message' rows={3}></textarea>
              <button className='bg-primary py-3 px-7 text-white rounded-lg hover:bg-secondary' type='submit'>message send </button>
            </form>
          </div>
          <div className="w-4/12">
            <Image className='rounded-xl' src={Img} alt='img' width={400} placeholder='blur' />
          </div>
        </div>
      </section>
    </>
  )
}

export default page