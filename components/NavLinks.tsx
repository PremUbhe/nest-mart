"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

const links = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Cart",
    path: "/cart",
  },
  {
    name: "Deals",
    path: "/deals",
  },
  {
    name: "Wishlisht",
    path: "/wishlisht",
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${link.path === pathname && "text-primary"} 
                        capitalize text-base hover:text-primary`}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
