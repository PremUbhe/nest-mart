"use client";

import React, { useState } from "react";
import Image from "next/image";
import login from "@/public/login-1.png";
import Link from "next/link";
import { useTransition } from "react";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { signInSchemma } from "@/lib/Schemas/signInSchema";

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
import FormError from "@/components/FormError";
import { useRouter } from "next/navigation";

import LogInAction from "@/lib/Actions/LogInAction";

const Login = () => {

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
      <div className="flex gap-5 max-w-3xl mx-auto bg-white p-5 rounded-xl shadow-xl">
        <div className="w-6/12">
          <Image className="rounded-lg" src={login} alt="Log In" />
        </div>
        <div className="w-6/12">
          <h2 className="text-4xl">Login</h2>
          <p className="mb-5">
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
              <FormError message={error} />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Logging in..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
