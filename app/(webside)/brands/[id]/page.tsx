import React from 'react'
import { getBrandIdData } from '@/lib/helpers/brands'

const page = async ({ params }: { params: { id: string } }) => {

    const brandData = await getBrandIdData(params.id)

    return (
        <div>{brandData.name}</div>
    )
}

export default page