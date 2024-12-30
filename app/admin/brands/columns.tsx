"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

// ui
import { Button } from "@/components/ui/button"

// componenets
import DeleteBrandBut from "@/components/admin/brand/DeleteBrandBut"

// icons
import { FaPencil } from "react-icons/fa6"
import { ArrowUpDown } from "lucide-react"

// type
import { brandType } from "@/lib/ApiFunctions/Brands"


export const columns: ColumnDef<brandType>[] = [
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
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Brand Names
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {row.getValue("name")}
                </div>
            )
        }
    },
    {
        id: "actions",
        header: () => (
            <div className="text-center">
                Actions
            </div>
        ),
        cell: ({ row }) => {

            const brands = row.original

            return (
                <div className="flex justify-center gap-2">
                    <Button
                        variant="default"
                        className="h-8 w-8 p-0 bg-yellow-500 text-white"
                    >
                        <Link href={`/admin/brands/add/${brands._id}/${brands.name}`}><FaPencil /></Link>
                    </Button>
                    <DeleteBrandBut params={brands} />
                </div>
            )
        },
    },
]
