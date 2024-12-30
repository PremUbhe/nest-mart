"use client";

import React, { useState, useTransition } from 'react';
import Link from 'next/link';

// hooks
import { useRouter } from "next/navigation";
import { useToast } from '@/hooks/use-toast';

// ui
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"

// components
import CategoryAddAction from '@/lib/Actions/CategoryAddAction';
import FormError from '@/components/website/forms/FormError';

// icons
import { FaCircleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const CategoryAdd = () => {

  const { toast } = useToast()
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');

  function formAction(formData: FormData) {
    startTransition(() => {
      CategoryAddAction(formData)
        .then((data) => {
          if (data?.success) {
            toast({
              title: "Done",
              description: `${data?.message}`,
            })
            router.push("/admin/categories");
          } else {
            setError(data?.message)
          }
        })
        .catch((error) => {
          setError(error)
        })
    })
  }

  return (
    <section className='max-w-screen-xl mx-auto'>
      <div className='flex gap-5 items-center mb-3'>
        <Button variant="outline" size="icon" className='text-gray border-gray'>
          <Link href="/admin/categories" ><FaCircleLeft /></Link>
        </Button>
        <h2 className='text-gray text-4xl font-semibold'>Add Category</h2>
      </div>
      <form action={formAction}>
        <div className="flex gap-5 mb-3">
          <div className="w-6/12">
            <Label htmlFor="name">Category Name</Label>
            <Input
              type="text"
              name="name"
              className='bg-black-secondary mt-1'
              required
            />
          </div>
          <div className="w-6/12">
            <Label htmlFor="img">Category Image</Label>
            <Input
              type="file"
              name="img"
              className='mt-1'
              required
            />
          </div>
        </div>
        <FormError message={error} />
        <Button
          variant="outline"
          className='mt-3'
          type='submit'
          size="default"
          disabled={isPending}
        >
          <FaPlus /> Add
        </Button>
      </form>

    </section>
  )
}

export default CategoryAdd