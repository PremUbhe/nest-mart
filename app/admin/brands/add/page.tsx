'use client'
import React, { useState, useTransition } from 'react';
import Link from 'next/link';

// form
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation";
import FormError from '@/components/website/forms/FormError';

// hooks
import { useToast } from '@/hooks/use-toast';

// action
import BrandAddAction from '@/lib/Actions/BrandAddAction';

// components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// icons
import { FaCircleLeft } from "react-icons/fa6";


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Brand name must be at least 2 characters.",
  }),
})

const BrandAdd = () => {

  const { toast } = useToast()

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      BrandAddAction(values)
        .then((data) => {
          if (data?.success) {
            toast({
              title: "Done",
              description: `${data?.message}`,
            })
            router.push("/admin/brands");
          } else {
            setError(data?.message)
          }
        })
    });
  }

  return (
    <section className='max-w-screen-xl mx-auto'>
      <div className='flex gap-5 items-center mb-3'>
        <Button variant="outline" size="icon" className='text-gray border-gray'>
          <Link href="/admin/brands" ><FaCircleLeft /></Link>
        </Button>
        <h2 className='text-gray text-4xl font-semibold'>Brand</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='bg-black-secondary'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <Button
            type="submit"
            variant="outline"
            className='text-gray'
            disabled={isPending}
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default BrandAdd