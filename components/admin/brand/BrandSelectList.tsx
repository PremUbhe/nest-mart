import React from 'react'

// components
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// data
import { getBrandData } from '@/lib/ApiFunctions/Brands';

// type
import { brandType } from '@/lib/ApiFunctions/Brands';

const BrandSelectList = async () => {

    const brandData = await getBrandData()

    return (
        <Select name="brand" required>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Brand" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Brands</SelectLabel>
                    {brandData.map((data: brandType, index: number) => {
                        return (
                            <SelectItem key={index} value={data._id}>{data.name}</SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default BrandSelectList