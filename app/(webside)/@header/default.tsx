"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";

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
// import { FaCartShopping } from "react-icons/fa6";
// import { FaBell } from "react-icons/fa6";
// import { FaRegHeart } from "react-icons/fa6";
// import { FaUser } from "react-icons/fa6";

const Default = () => {
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex gap-3">

              <Avatar className='h-16 w-16'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex justify-center text-start flex-col">
                <h3 className='text-primary font-medium'>Prem Ubhe</h3>
                <h4 className='text-gray text-sm'>ubheprem1@gmail.com</h4>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/admin"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Cart</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Wishlist</DropdownMenuItem>
            <DropdownMenuItem>Notification</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Default