"use client"

import React from 'react'
import Image from "next/image"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// ui
import { Button } from "@/components/ui/button"

// icons
import { FaPencil } from "react-icons/fa6";


// type
import { categoryType } from '@/lib/ApiFunctions/Category';

import DeleteCategoryBut from '@/components/admin/category/DeleteCategoryBut'

export const columns: ColumnDef<categoryType>[] = [
    {
        id: "id",
        header: () => <div className="text-center">SR No.</div>,
        cell: ({ row }) => (
            <div className="text-center">
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
            const category = row.original

            return (
                <div className="flex gap-2 justify-center">
                    <Button
                        variant="default"
                        className="h-8 w-8 p-0 bg-yellow-500 text-white"
                    >
                        <FaPencil />
                    </Button>
                    <DeleteCategoryBut params={category} />
                </div >
            )
        },
    },
]



