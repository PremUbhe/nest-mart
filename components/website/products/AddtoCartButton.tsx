'use client';
import React from 'react'
import { useState, useTransition, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// components
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

// ui
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerClose,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

// hook
import { useToast } from '@/hooks/use-toast';

// function
import { updateUserCart } from "@/lib/ApiFunctions/UserCart";

// icons
import { FaCartShopping } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const AddtoCartButton = ({ stock, productId, quantityCount }: { stock: number, productId: string, quantityCount: number }) => {

    const { data: session } = useSession();
    const { toast } = useToast()

    const userId: string = session?.user.id

    const [quantity, setQuantity] = useState<number>(quantityCount);
    const [isClient, setIsClient] = useState(false);
    const [isPending, startTransition] = useTransition();

    const params = { userId, productId, quantity }

    const addCartAction = () => {
        startTransition(() => {

            updateUserCart({ params })
                .then((data) => {
                    if (data?.success) {

                        toast({
                            title: "Done",
                            description: `${data?.message}`,
                        })

                    } else {

                        toast({
                            variant: "destructive",
                            title: "Fail",
                            description: `${data?.message}`,
                        })
                    }
                });
        });
    }

    useEffect(() => {
        if (userId) {
            setIsClient(true);
        }
    }, [userId]);

    if (!isClient) {

        const loginAction = () => {
            toast({
                variant: "destructive",
                title: "Unauthorized",
                description: "Please log in to add items to your cart.",
            })
        }

        return (
            <Button
                className="bg-primary-light rounded-lg text-primary hover:bg-primary hover:text-white"
                onClick={() => loginAction()}
            >
                <div className="flex items-center gap-3">
                    <FaCartShopping /> <h4>Add</h4>
                </div>
            </Button>
        )
    }

    return (
        <Drawer>
            <DrawerTrigger>
                <Button
                    className="relative bg-primary-light rounded-lg text-primary hover:bg-primary hover:text-white">
                    <div className="flex items-center gap-3">
                        <FaCartShopping /> <h4>Add</h4>
                    </div>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-white">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className='text-center'>Add Product to Your Cart</DrawerTitle>
                        <DrawerDescription className='text-center'>Please select the quantity</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex justify-center gap-3 p-4">
                        <Button
                            className='shadow hover:bg-primary-light hover:text-primary'
                            variant="outline"
                            size="icon"
                            onClick={() => quantity < stock ? setQuantity(quantity + 1) : null}
                        >
                            <FaPlus />
                        </Button>
                        <Input
                            className='shadow w-20'
                            type="text"
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            value={quantity} />
                        <Button
                            className='shadow hover:bg-primary-light hover:text-primary'
                            variant="outline"
                            size="icon"
                            onClick={() => quantity > 1 ? setQuantity(quantity - 1) : null}
                        >
                            <FaMinus />
                        </Button>
                    </div>
                    <DrawerFooter>
                        <DrawerClose className='flex flex-row justify-center gap-3'>
                            <Button
                                className='shadow flex gap-2 items-center bg-primary text-white hover:bg-secondary hover:text-white'
                                disabled={session === null || isPending}
                                variant="outline"
                                size="lg"
                                onClick={() => addCartAction()}
                            >
                                <FaCartShopping /> Add to Cart
                            </Button>
                            <Button
                                variant="outline"
                                size="lg">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default AddtoCartButton