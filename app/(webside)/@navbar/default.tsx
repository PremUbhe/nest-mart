import React from 'react';
import NavLinks from "@/components/NavLinks";


const Default = () => {
  return (
    <nav className="container mx-auto p-4 border-b border-primary-light">
      <div className="flex items-center justify-end">
        <div className="flex gap-10">
          <NavLinks />
        </div>
      </div>
    </nav>
  )
}

export default Default