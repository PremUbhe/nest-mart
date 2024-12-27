"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const links = [
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
    name: "Products",
    path: "/products",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Blogs",
    path: "/blog",
  },
  {
    name: "Contact",
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
                        text-blue font-semibold capitalize hover:text-primary`}
          >
            {link.name}
          </Link>
        );
      })}

    </>
  );
};

export default NavLinks;
