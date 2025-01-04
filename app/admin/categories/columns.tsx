"use client"

import React, { useState } from 'react'
import Image from "next/image"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// ui
import { Button } from "@/components/ui/button"

// hooks
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

// icons
import { FaPencil } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";

// type
import { categoryType, deleteCategoryById } from '@/lib/ApiFunctions/Category';


// delete button 
const DeleteButton = ({id, imgId} : {id: string, imgId: string}) => {

    const { toast } = useToast();
    const router = useRouter();

    const [isPending, setPending] = useState<boolean>(false);

    const handleDelete = async () => {
        setPending(true);
        try {
            const res = await deleteCategoryById(id, imgId);
            if (res.success) {
                toast({
                    title: "Done",
                    description: res.message,
                });
                router.refresh();
            } else {
                toast({
                    variant: "destructive",
                    title: "Fail",
                    description: res.message,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: `Something went wrong. ${error}`,
            });
        } finally {
            setPending(false);
        }
    };

    return (
        <Button
            variant="destructive"
            className="h-8 w-8 p-0 text-white"
            onClick={handleDelete}
            disabled={isPending}
        >
            <FaTrashCan />
        </Button>
    )
}


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
                    <DeleteButton id={category._id} imgId={category.imgId} />
                </div >
            )
        },
    },
]



