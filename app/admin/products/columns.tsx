"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

// tabel
import { ColumnDef } from "@tanstack/react-table"

// ui
import { Button } from "@/components/ui/button"

// icons
import { FaPencil } from "react-icons/fa6"
import { ArrowUpDown } from "lucide-react"

// type
import { productType } from "@/lib/ApiFunctions/Products"

// data
import { getCategoryId } from "@/lib/ApiFunctions/Category"
import { getBrandById } from "@/lib/ApiFunctions/Brands"


// get category name by id
const CategoryCell = ({ categoryId }: { categoryId: string }) => {

    const [categoryData, setCategoryData] = useState<string>("...");

    useEffect(() => {
        const fetchData = async () => {
            const category = await getCategoryId(categoryId);
            if (category.success && category.data) {
                setCategoryData(category.data.name);
            }
        };
        fetchData();
    }, [categoryId]);
    

    return <div className="text-center">{categoryData}</div>;
};

// get barnd name by id
const BrandCell = ({ brandId }: { brandId: string }) => {

    const [brandData, setBrandData] = useState<string>("...");

    useEffect(() => {
        const fetchData = async () => {
            const brand = await getBrandById(brandId);
            if (brand.success && brand.data) {
                setBrandData(brand.data.name);
            }
        };
        fetchData();
    }, [brandId]);

    return <div className="text-center">{brandData}</div>;
};

// tabel
export const columns: ColumnDef<productType>[] = [
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
        header: () => <div className="text-center">Product Images</div>,
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
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Product Names
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
        accessorKey: "category",
        header: () => <div className="text-center">Product Category</div>,
        cell: ({ row }) => {

            const categoryId: string = row.getValue("category");
            return <CategoryCell categoryId={categoryId} />;
        },
    },
    {
        accessorKey: "brand",
        header: () => <div className="text-center">Product Brand</div>,
        cell: ({ row }) => {
            const brandId: string = row.getValue("brand");
            return <BrandCell brandId={brandId} />;
        },
    },
    {
        accessorKey: "price",
        header: () => <div className="text-center">Product Price</div>,
        cell: ({ row }) => {

            const price = parseFloat(row.getValue("price"));

            const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(price)

            return (
                <div className="flex justify-center">
                    {formatted}
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
                    {/* <DeleteBrandBut params={brands} /> */}
                </div>
            )
        },
    },
]
