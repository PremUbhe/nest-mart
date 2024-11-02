import React from 'react';
import NavLinks from "@/components/NavLinks";

const NavBar = () => {
  return (
    <nav className="sticky top-0 p-4 bg-white border-b border-primary-light shadow z-50">
      <div className="container flex items-center justify-end">
        <div className="flex gap-10">
          <NavLinks />
        </div>
      </div>
    </nav>
  )
}

export default NavBar