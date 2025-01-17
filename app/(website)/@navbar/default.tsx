import React from 'react';
import NavLinks from "@/components/website/navbar/NavLinks";

import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"


// icons
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { MdDashboard } from "react-icons/md";

// data
import { getCategoryData } from '@/lib/ApiFunctions/Category';

// type
import { categoryType } from '@/lib/ApiFunctions/Category';
import ResponsiveNavbar from '@/components/website/navbar/ResponsiveNavbar';

const Default = async () => {

  const categoryData = await getCategoryData()

  if (categoryData.data) {
    return (
      <nav className="sticky top-0 py-2 px-4 bg-white border-b border-primary-light shadow z-50">
        <div className="block lg:hidden">
          <div className="flex justify-end">
            <ResponsiveNavbar />
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="flex justify-between">
            <div className="flex xl:gap-10 gap-5 items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className='flex gap-2 items-center bg-secondary font-semibold text-blue py-2 px-7 rounded-lg hover:bg-secondary'><MdDashboard /> Browse All Categories</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {categoryData.data?.map((data: categoryType, index: number) => (
                          <div className='flex items-center border border-border-color gap-3 p-2 rounded-lg hover:bg-primary-light'
                            key={index}
                          >
                            <Image src={data.img} alt='data.name' width={25} height={25}></Image>
                            <h4 className='text-sm font-semibold text-blue'>{data.name}</h4>
                          </div>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <NavLinks />
            </div>
            <div className="flex items-center gap-4">
              <TfiHeadphoneAlt className='text-4xl' />
              <div className="flex flex-col">
                <h3 className='text-primary text-2xl font-bold'>1900 - 888</h3>
                <p className='text-gray text-sm'>24/7 Support Center</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="sticky top-0 py-2 px-4 bg-white border-b border-primary-light shadow z-50">
        <div className="flex justify-between">
          <div className="flex gap-10 items-center">
            <NavLinks />
          </div>
          <div className="flex items-center gap-4">
            <TfiHeadphoneAlt className='text-4xl' />
            <div className="flex flex-col">
              <h3 className='text-primary text-2xl font-bold'>1900 - 888</h3>
              <p className='text-gray text-sm'>24/7 Support Center</p>
            </div>
          </div>
        </div>
      </nav>
    );
  }

}

export default Default