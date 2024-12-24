"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// componenets
import DeleteBrandBut from "@/components/admin/brand/DeleteBrandBut"

// icons
import { FaPencil } from "react-icons/fa6"

// type
import { brandType } from "@/lib/ApiFunctions/Brands"

export const columns: ColumnDef<brandType>[] = [
    {
        id: "select",
        header: () => <div className="flex justify-center">SR No.</div>,
        cell: ({row}) => (
            <div className="flex justify-center">
                {row.index + 1}
            </div>
        ),
        enableSorting: false,
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
                        Brand Names
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex justify-center">
                    {row.getValue("name")}
                </div>
            )
        }
    },
    {
        id: "actions",
        header: () => (
            <div className="flex justify-center">
                Actions
            </div>
        ),
        cell: ({ row }) => {
            const brands = row.original

            return (
                <div className="flex justify-center gap-2">
                    <Link href={`/admin/brands/add/${brands._id}`} className='p-2 text-white bg-yellow-500 rounded-lg' type='button'><FaPencil /></Link>
                    <DeleteBrandBut params={brands} />
                </div>
            )
        },
    },
]
