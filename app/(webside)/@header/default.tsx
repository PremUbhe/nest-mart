"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";

import { useSession, signOut } from 'next-auth/react';

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from '@/components/ui/input';
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex gap-3">

                  <Avatar className='h-16 w-16'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex justify-center text-start flex-col">
                    <h3 className='text-primary font-medium'>{session.user.username}</h3>
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
          ) : (
            <Link className='py-2 px-6 rounded-lg font-semibold text-blue bg-secondary hover:bg-primary' href="/login">Log In</Link>
          )
        }
      </div>
    </header>
  )
}

export default Default