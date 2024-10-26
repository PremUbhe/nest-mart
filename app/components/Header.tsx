"use client";
import React from "react";
// import { useState } from "react";
// icons
import { FaCartShopping } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";

// redux
// import { selectCount } from "@/lib/features/counter/counterSlice";
// import { useAppSelector } from "@/lib/hooks";

const Header = () => {
  // const count = useAppSelector(selectCount);

  return (
    <div className="flex gap-20">
        <input
          className="border border-primary rounded-lg p-2"
          type="text"
          name="search"
          id="search-bar"
          placeholder="Search for items..."
        />
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
        <div className="link flex items-end gap-1">
          <div className="icon relative pt-2 pe-2">
            <FaCartShopping className="text-2xl" />
            <div className="item-count absolute top-0 right-0 text-sm text-white bg-primary px-1 rounded-xl">
              {/* {count} */} 4
            </div>
          </div>
          Cart
        </div>
        <div className="link flex items-end gap-1">
          <div className="icon relative pb-1">
            <FaUser className="text-xl" />
          </div>
          Account
        </div>
      </div>
    </div>
  );
};

export default Header;
