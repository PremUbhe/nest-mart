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
import { GetBrandData } from '@/lib/Helpers/Brands';

// type
import { brandType } from '@/lib/Helpers/Brands';

const BrandSelectList = async () => {

    const brandData = await GetBrandData()

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