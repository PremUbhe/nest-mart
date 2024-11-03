import React from 'react'

const Category = () => {

  // function actionForm(formData: FormData) {
    
  // }

  return (
    <section>
      <h2>Category</h2>
      <form action="" className='flex flex-wrap gap-5'>
        <input type="text" className='p-4 border grow' name="name" placeholder='name' />
        <input type="text" className='p-4 border grow' name="imgURL" placeholder='imgURL' />
      </form>
    </section>
  )
}

export default Category