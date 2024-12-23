"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type cartDataType = {
    productId: string;
    productName: string;
    productImg: string;
    productPrice: number;
    productDiscount: number;
    productQuantity: number;
}

export const columns: ColumnDef<cartDataType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex gap-2 text-left">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
                No.
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
                <h4>{row.index + 1}</h4>
            </div>

        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "productImg",
        header: () => <div className="text-center">Product Images</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Image src={row.getValue("productImg")} alt='img' width={50} height={50}></Image>
            </div>
        )
    },
    {   
        id: "product",
        accessorKey: "productName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Products
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "productPrice",
        header: () => <div className="text-left">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("productPrice"))
            const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(amount)

            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "productDiscount",
        header: () => <div className="text-center">Discount</div>,
        cell: ({ row }) => {
            const discount : number = row.getValue("productDiscount")
            return <div className="text-center font-medium">{discount}%</div>
        }
    },
    {
        accessorKey: "productQuantity",
        header: () => <div className="text-center">Quantity</div>,
        cell: ({ row }) => {
            const quantity : number = row.getValue("productQuantity")
            return <div className="text-center">{quantity}</div>
        }
    },
    {
        id: "actions",
        header: () => <div className="text-left">Total Price</div>,
        cell: ({ row }) => {
            const price: number = row.getValue("productPrice");
            const quantity: number = row.getValue("productQuantity");
            const discount: number = row.getValue("productDiscount");

            const totalAmount : number = (price * quantity) - (price * discount * quantity / 100)

            const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(totalAmount)

            return (
                <div className="flex gap-2 items-center justify-between">
                    <h4 className="font-semibold">{formatted}</h4>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Product</DropdownMenuItem>
                            <DropdownMenuItem>Remove Product</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
