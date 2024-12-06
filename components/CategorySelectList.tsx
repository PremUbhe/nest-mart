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
import { getCategoryData } from '@/lib/Helpers/Category';

// type
import { categoryType } from '@/lib/Helpers/Category';

const CategorySelectList = async () => {

    const categoryData = await getCategoryData()

    return (
        <Select name="category" required>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {
                        categoryData.map((data: categoryType, index: number) => {
                            return (
                                <SelectItem key={index} value={data._id}>{data.name}</SelectItem>
                            )
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>

    )
}

export default CategorySelectList