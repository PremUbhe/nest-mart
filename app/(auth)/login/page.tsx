"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

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

// component
import FormError from "@/components/website/forms/FormError";

// type
import { signInSchemma } from "@/lib/Schemas/signInSchema";

// action
import LogInAction from "@/lib/Actions/LogInAction";

// img
import login from "@/public/login-1.png";

// icons
import { IoChevronBackOutline } from "react-icons/io5";

const Login = () => {

  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthCallback" ? "Email already in use with different provider" : "somthing went wrong"
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof signInSchemma>>({
    resolver: zodResolver(signInSchemma),
    defaultValues: {
      identifier: "",
      password: ""
    }
  })

  function onSubmit(values: z.infer<typeof signInSchemma>) {

    startTransition(() => {
      LogInAction(values)
        .then((data) => {
          setError(data?.error)
          if (data?.success) {
            router.push("/home");
          }
        })
    });
  }

  return (
    <section className="w-full h-screen bg-primary flex justify-center items-center">
      <div className="wrapper flex flex-col gap-3 items-start">
        <Link href="/home">
          <Button variant="default" size="icon" className='bg-white'><IoChevronBackOutline /></Button>
        </Link>
        <div className="flex gap-5 max-w-3xl mx-auto bg-white p-5 rounded-xl shadow-xl">
          <div className="w-6/12">
            <Image className="rounded-lg" src={login} alt="Log In" />
          </div>
          <div className="w-6/12">
            <h2 className="text-4xl font-bold text-blue">Login</h2>
            <p className="mb-5 text-gray">
              Don&apos;t have an account?{" "}
              <Link className="text-primary" href="/register">
                Create here
              </Link>
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username or Email</FormLabel>
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
                <FormError message={error || urlError} />
                <Button 
                type="submit" 
                className="text-white font-semibold"
                size="lg"
                disabled={isPending}>
                  {isPending ? "Logging in..." : "Log in"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
