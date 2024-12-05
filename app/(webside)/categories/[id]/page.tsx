import React from 'react'
import { getCategoryIdData } from '@/lib/helpers/Category'

const page = async ({ params }: { params: { id: string } }) => {

    const categoryData = await getCategoryIdData(params.id)
    return (
        <div>{categoryData.name}</div>
    )
}

export default page