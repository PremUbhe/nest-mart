import React from "react";
import Image from "next/image";
import logo from "@/public/logo.svg";
import NavLinks from "./NavLinks";
import Header from "./Header";

const Navbar = () => {
  return (
    <header>
      <div className="flex items-center justify-between p-4 border border-border-color">
        <Image src={logo} height={50} alt="Logo" />
        <Header />
      </div>
      <nav className="container mx-auto py-4 border-b border-primary-light">
        <div className="flex items-center justify-end">
          <div className="flex gap-10">
            <NavLinks />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
