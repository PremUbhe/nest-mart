'use client';

import React, { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// img
import loader from "@/public/loaders/type.gif"

// action
import ProductAddAction from '@/lib/Actions/ProductAddAction';

// hooks
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

// components
import FormError from '@/components/website/forms/FormError';

// ui
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// icons
import { FaCircleLeft } from "react-icons/fa6";

// data
import { categoryType, getCategoryData } from '@/lib/ApiFunctions/Category';
import { getBrandData, brandType } from '@/lib/ApiFunctions/Brands';


const ProductAdd = () => {

    const { toast } = useToast()
    const router = useRouter();

    const [categoryData, setCategoryData] = useState<categoryType[]>([]);
    const [brandData, setBrandData] = useState<brandType[]>([]);

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');

    function formAction(formData: FormData) {

        startTransition(async () => {

            const res = await ProductAddAction(formData);

            if (res.success) {
                toast({
                    title: "Done",
                    description: res.message,
                });
                router.push("/admin/products");
            } else {
                setError(res.message);
            }
        });
    }


    useEffect(() => {

        const fetchData = async () => {

            const category = await getCategoryData()
            if (category.success && category.data) {
                setCategoryData(category.data)
            }

            const brand = await getBrandData()
            if (brand.success && brand.data) {
                setBrandData(brand.data)
            }
        };

        fetchData()
    }, [])

    return (
        <section className='max-w-screen-xl mx-auto'>
            <div className='flex gap-5 items-center mb-3'>
                <Button variant="outline" size="icon" className='text-gray border-gray'>
                    <Link href="/admin/products" ><FaCircleLeft /></Link>
                </Button>
                <h2 className='text-gray text-4xl font-semibold'>Add Product</h2>
            </div>
            <form action={formAction}>
                <div className="flex justify-between flex-wrap">
                    <div className="w-6/12 pe-3 mb-5">
                        <Input
                            type="text"
                            name="name"
                            placeholder='Product Name'
                            className='bg-black-secondary font-semibold'
                            required
                        />
                    </div>
                    <div className="w-6/12 ps-3 mb-5">
                        <Input
                            type="file"
                            name="img"
                            className='bg-black-secondary'
                            required
                        />
                    </div>
                    <div className="w-6/12 pe-3 mb-5">
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
                    </div>
                    <div className="w-6/12 ps-3 mb-5">
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
                    </div>
                    <div className="w-3/12 pe-3 mb-5">
                        <Input
                            type="number"
                            className='bg-black-secondary font-bold'
                            name='price'
                            placeholder='Price'
                            required
                        />
                    </div>
                    <div className="w-3/12 px-3 mb-5">
                        <Input
                            type="number"
                            className='bg-black-secondary font-bold'
                            name='discount'
                            placeholder='Discount'
                            required
                        />
                    </div>
                    <div className="w-3/12 px-3 mb-5">
                        <Input
                            type="number"
                            className='bg-black-secondary font-bold'
                            name='rating'
                            placeholder='Rating'
                            required
                        />
                    </div>
                    <div className="w-3/12 ps-3 mb-5">
                        <Input
                            type="number"
                            className='bg-black-secondary font-bold'
                            name='stock'
                            placeholder='Avalabel Stock'
                            required />
                    </div>
                    <div className="w-full mb-5">
                        <Textarea
                            name="description"
                            className='border bg-black-secondary font-bold'
                            id="description"
                            placeholder='Description'
                            rows={4}
                        ></Textarea>
                    </div>
                </div>
                <FormError message={error} />
                <Button
                    type='submit'
                    className='mt-3'
                    variant="outline"
                    size="default"
                    disabled={isPending}
                >
                    {isPending ? (
                        <Image src={loader} width={50} alt='loading ...' unoptimized />
                    ) : "Submit"}
                </Button>
            </form>
        </section>
    )
}

export default ProductAdd