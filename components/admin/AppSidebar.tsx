"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { useSession } from 'next-auth/react';

// img
import logo from "@/public/logo.svg";

// icons
import {Home } from "lucide-react"
import { BiCategory } from "react-icons/bi";
import { TbBrandAirtable } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";


export function AppSidebar() {

  const { data: session } = useSession();

  const pathname = usePathname();

  if (session) {

    return (
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex bg-white p-2 rounded-lg">
                <Image src={logo} alt='logo' />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/admin'}>
                <Link href="/admin" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Dashbord</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>CMS</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/admin/categories'}>
                    <Link href="/admin/categories" className="flex items-center gap-2">
                      <BiCategory className="h-4 w-4" />
                      <span>Category</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/admin/brands' || pathname === '/admin/brands/add'}>
                    <Link href="/admin/brands" className="flex items-center gap-2">
                      <TbBrandAirtable className="h-4 w-4" />
                      <span>Brands</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/products" className="flex items-center gap-2">
                      <MdOutlineCategory className="h-4 w-4" />
                      <span>Products</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/setting" className="flex items-center gap-2">
                  <IoSettingsOutline className="h-4 w-4" />
                  <span>Setting</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex gap-3 bg-black-secondary p-2 rounded-lg">
                <Avatar className='h-14 w-14 rounded-lg'>
                  {session.user.image && <AvatarImage src={session.user.image} />}
                  <AvatarFallback className="rounded-lg text-black font-semibold" >{session.user.name ? session.user.name.substring(0, 2).toUpperCase() : "US"}</AvatarFallback>
                </Avatar>
                <div className="flex justify-center text-start flex-col">
                  {session.user.name ? <h3 className='text-primary font-medium'>{session.user.name}</h3> : <h3 className='text-primary font-medium'>User</h3>}
                  <h4 className='text-gray text-sm'>{session.user.email}</h4>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    )
  } else {
    return null;
  }

}
