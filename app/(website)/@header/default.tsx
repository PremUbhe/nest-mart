"use client";
import React, { Suspense } from 'react';
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";

import { useSession, signOut } from 'next-auth/react';

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// icons
import { FaCartShopping } from "react-icons/fa6";
import { RiHeart3Fill } from "react-icons/ri";
import { IoLogIn } from "react-icons/io5";
import { RiSettings4Fill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";

const Default = () => {

  const { data: session } = useSession();

  return (
    <header className='p-4 flex justify-between items-center border-b border-primary-light'>
      <div className="flex gap-20 items-center ">
        <Image src={logo} alt='logo' />
      </div>
      <div className="flex items-center gap-7">
        <Input
          className="lg:w-96"
          type="text"
          name="search"
          id="search-bar"
          placeholder="Search for items..."
        />
        {
          session ? (
            <Suspense fallback={
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            } >
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex gap-3">
                    <Avatar className='h-16 w-16'>
                      {session.user.image && <AvatarImage src={session.user.image} />}
                      <AvatarFallback>{session.user.name ? session.user.name.substring(0, 2).toUpperCase() : "US"}</AvatarFallback>
                    </Avatar>
                    <div className="flex justify-center text-start flex-col">
                      {session.user.name ? <h3 className='text-primary font-medium'>{session.user.name}</h3> : <h3 className='text-primary font-medium'>User</h3>}
                      <h4 className='text-gray text-sm'>{session.user.email}</h4>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  {
                    session.user.type == "master" && (
                      <Link href="/admin">
                        <DropdownMenuItem>
                          <MdAdminPanelSettings />
                          Admin
                        </DropdownMenuItem>
                      </Link>
                    )
                  }
                  <Link href="/cart">
                    <DropdownMenuItem> <FaCartShopping /> Cart</DropdownMenuItem>
                  </Link>
                  <Link href="/wishlist">
                    <DropdownMenuItem> <RiHeart3Fill /> Wishlist</DropdownMenuItem>
                  </Link>
                  <Link href="/setting">
                    <DropdownMenuItem><RiSettings4Fill /> Setting</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}><IoLogIn /> Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Suspense>
          ) : (
            <Link className='py-2 px-6 rounded-lg font-semibold text-white bg-primary hover:bg-secondary hover:text-blue' href="/login">Log In</Link>
          )
        }
      </div>
    </header>
  )
}

export default Default