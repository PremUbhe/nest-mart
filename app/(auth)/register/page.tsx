"use client";

import React, { useState, useTransition } from 'react'
import Link from 'next/link'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react';

// ui
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { IoChevronBackOutline } from "react-icons/io5";


// component
import FormError from "@/components/website/forms/FormError";
import FormSuccess from '@/components/website/forms/FormSuccess';

// type
import { signUpSchema } from '@/lib/Schemas/signUpSchema';

// action
import RegisterAction from '@/lib/Actions/RegisterAction';

const Register = () => {

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    startTransition(() => {
      RegisterAction(values)
        .then((data) => {
          setError(data?.error)
          setSuccess(data?.success)
        })
    });
  }

  return (
    <section className='flex w-full h-screen bg-primary items-center justify-center'>
      <div className="wrapper flex flex-col gap-3 items-start">
        <Link href="/home">
          <Button variant="default" size="icon" className='bg-white'><IoChevronBackOutline /></Button>
        </Link>
        <div className="flex gap-5 p-5 bg-white rounded-xl shadow-xl max-w-3xl mx-auto">
          <div className="w-6/12">
            <h2 className='text-4xl text-blue font-bold'>Create an Account</h2>
            <p className='mb-5 text-gray'>Already have an account? <Link className='text-primary' href="/login">Login</Link></p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          type="text"
                          disabled={isPending}
                          {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          type="email"
                          disabled={isPending}
                          {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          type="password"
                          disabled={isPending}
                          {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  type="submit"
                  className='text-white font-semibold'
                  size="lg"
                  disabled={isPending}
                >
                  {isPending ? "..." : "Submit & Register"}
                </Button>
              </form>
            </Form>
            <p className='text-gray mt-3 text-sm'>Note:Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy</p>
          </div>
          <div className="w-6/12">
            <div className="p-5 border border-primary rounded-xl flex flex-col h-full gap-3 justify-center">
              <Button
                variant="outline"
                size="lg"
                className='text-blue font-semibold'
                onClick={()=> signIn("google", {callbackUrl: "/home"})}
              >
                <FcGoogle /> Continue with Google
              </Button>
              <Button
                variant="outline"
                size="lg"
                className='text-blue font-semibold'
                onClick={()=> signIn("github", {callbackUrl: "/home"})}
              >
                <FaGithub /> Continue with GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register