import React from 'react'

const Categories = () => {
  return (
    <>
    <section className='m-4 py-16 rounded-lg bg-[url("/header-bg.png")] bg-cover'>
        <div className="container">
          <div className="flex justify-between items-center">
            <h1 className='text-4xl text-blue font-bold'>Categories</h1>
            <input type="text" className='py-2 px-4 w-96 border rounded-xl border-primary' placeholder='Search...' />
          </div>
        </div>
      </section>
    </>
  )
}

export default Categories