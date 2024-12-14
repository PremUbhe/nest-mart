"use client"

import React from 'react'
import Image from "next/image"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { useToast } from "@/hooks/use-toast";

// icons
import { FaTrashCan } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";


// type
import { categoryType, DeleteCategoryById } from '@/lib/ApiFunctions/Category';


const DeleteCategory = async (id: string) => {

    // const { toast } = useToast();
    await DeleteCategoryById(id);

    // toast({
    //     title: `${id}`,
    //     description: "Category Deleted successfully",
    // })
}

export const columns: ColumnDef<categoryType>[] = [
    {
        accessorKey: "_id",
        header: ({ table }) => (
            <div className="flex gap-2 px-5 items-center text-left">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
                SR No.
            </div>
        ),
        cell: ({ row }) => (
            <div className=" flex gap-2 px-5 items-center text-left">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
                {row.index + 1}
            </div>

        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "img",
        header: () => <div className="text-center">Category Images</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Image src={row.getValue("img")} alt='img' width={50} height={50}></Image>
            </div>
        )
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Category Names
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => (
            <div className="flex justify-center">
                {row.getValue("name")}
            </div>
        )
    },
    {
        id: "actions",
        header: () => <div className="text-center">Action</div>,
        cell: ({ row }) => {
            const data = row.original

            return (
                <div className="flex gap-2 justify-center">

                    <Button variant="default" className="bg-yellow-500 text-white" size="icon"><FaPencil /></Button>
                    <Button variant="destructive" size="icon" onClick={() => DeleteCategory(row.getValue("_id"))}><FaTrashCan /></Button>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(data._id)}
                            >
                                Copy Category ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Category</DropdownMenuItem>
                            <DropdownMenuItem>View Category</DropdownMenuItem>
                            <DropdownMenuItem>Delete Category</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div >
            )
        },
    },
]



