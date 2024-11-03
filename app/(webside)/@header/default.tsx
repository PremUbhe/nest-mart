"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";

// icons
import { FaCartShopping } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";

const Default = () => {
  return (
    <header className='p-4 flex justify-between items-center border-b border-primary-light'>
      <div className="flex gap-20 items-center ">
        <Image src={logo} alt='logo' />
        <div className="flex items-center gap-3 px-4 py-2 border border-primary rounded-lg">
          <h4> All Categories</h4>
          <hr />
          <input
            className="p-2 px-4 border-s "
            type="text"
            name="search"
            id="search-bar"
            placeholder="Search for items..."
          />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="link flex items-end gap-1">
          <div className="icon relative pt-2 pe-2">
            <FaBell className="text-2xl" />
            <div className="item-count absolute top-0 right-0 text-sm text-white bg-primary px-1 rounded-xl">
              2
            </div>
          </div>
          Notification
        </div>
        <div className="link flex items-end gap-1">
          <div className="icon relative pt-2 pe-2">
            <FaRegHeart className="text-2xl" />
            <div className="item-count absolute top-0 right-0 text-sm text-white bg-primary px-1 rounded-xl">
              2
            </div>
          </div>
          Wishlist
        </div>
        <Link href="/admin" className="link flex items-end gap-1">
          <div className="icon relative pt-2 pe-2">
            <FaCartShopping className="text-2xl" />
            <div className="item-count absolute top-0 right-0 text-sm text-white bg-primary px-1 rounded-xl">
              {/* {count} */} 4
            </div>
          </div>
          Cart
        </Link>
        <Link href="/login" className="link text-text-secondary flex items-end gap-1">
          <div className="icon relative pb-1">
            <FaUser className="text-xl text-black" />
          </div>
          Account
        </Link>
      </div>
    </header>
  )
}

export default Default