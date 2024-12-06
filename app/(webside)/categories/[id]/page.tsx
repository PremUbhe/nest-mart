import React from 'react'
// import { GetCategoryIdData } from '@/lib/ApiFunctions/Category'

const page = async ({ params }: { params: { id: string } }) => {

    // const categoryData = await GetCategoryIdData(params.id)
    return (
        <div>{params.id}</div>
    )
}

export default page