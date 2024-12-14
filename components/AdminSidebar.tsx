"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

// ui
import { Button } from '@/components/ui/button';

// icons
import { FaWindows } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { TbBrandShopee } from "react-icons/tb";
import { AiFillProduct } from "react-icons/ai";


const AdminSidebar = () => {

    const pathname = usePathname();

    return (
        <div className="side-bar flex flex-col gap-3 border border-gray rounded-lg p-5 shadow-lg">
            <Button variant="outline" size="lg" className={`${"/admin" === pathname ? "bg-primary text-white" : "bg-primary-light"} justify-start hover:bg-primary hover:text-white`}>
                <Link className="flex gap-2" href="/admin"><FaWindows /> Dashbord</Link>
            </Button>
            <Button variant="outline" size="lg" className={`${"/admin/categories" === pathname ? "bg-primary text-white" : "bg-primary-light"} justify-start hover:bg-primary hover:text-white`}>
                <Link className="flex gap-2" href="/admin/categories"><MdCategory /> Category</Link>
            </Button>
            <Button variant="outline" size="lg" className={`${"/admin/brands" === pathname ? "bg-primary text-white" : "bg-primary-light"} justify-start hover:bg-primary hover:text-white`}>
                <Link className="flex gap-2" href="/admin/brands"><TbBrandShopee />Brands</Link>
            </Button>
            <Button variant="outline" size="lg" className={`${"/admin/products" === pathname ? "bg-primary text-white" : "bg-primary-light"} justify-start hover:bg-primary hover:text-white`}>
                <Link className="flex gap-2" href="/admin/products"><AiFillProduct /> Products</Link>
            </Button>
            <Button variant="outline" size="lg" className={`${"/admin/contact" === pathname ? "bg-primary text-white" : "bg-primary-light"} justify-start hover:bg-primary hover:text-white`}>
                <Link className="flex gap-2" href="/admin/contact"><MdCategory /> Contact Inquiry</Link>
            </Button>
        </div>
    )
}

export default AdminSidebar