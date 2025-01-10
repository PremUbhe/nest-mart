"use client"
import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

// icon
import { IoMenu } from "react-icons/io5";
import NavLinks from './NavLinks';
import Image from "next/image";
import logo from "@/public/logo.svg";


const ResponsiveNavbar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <IoMenu size={40} />
            </SheetTrigger>
            <SheetContent side={'left'} className='bg-white h-screen'>
                <SheetHeader>
                    <SheetTitle className='mb-10'>
                        <Image src={logo} alt='logo' />
                    </SheetTitle>
                    <SheetDescription className='flex flex-col gap-5 text-xl'>
                        <NavLinks />
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                </SheetFooter>
            </SheetContent>
        </Sheet>

    )
}

export default ResponsiveNavbar