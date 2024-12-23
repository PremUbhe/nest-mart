'use client';
import React from 'react';
import { useSession } from 'next-auth/react';

// function
import { AddtoCart } from "@/lib/ApiFunctions/UserCart";

// hook
import { useToast } from '@/hooks/use-toast';

// ui
import { Button } from '@/components/ui/button';

// icons
import { FaCartShopping } from "react-icons/fa6";


const AddtoCartButton = ({ productId, quantity }: { productId: string, quantity: number }) => {

    const { data: session } = useSession();
    const { toast } = useToast()

    if (session) {

        const userId: string = session.user.id
        const params = { userId, productId, quantity }

        const addCartAction = () => {
            console.log("i am here")
            AddtoCart({ params })
                .then((data) => {
                    if (data?.success) {

                        toast({
                            description: `${data?.message}`,
                        })

                    } else {

                        toast({
                            variant: "destructive",
                            description: `${data?.message}`,
                        })
                    }
                })
        }

        return (
            <Button
                className="bg-primary-light rounded-lg text-primary hover:bg-primary hover:text-white"
                onClick={() => addCartAction()}
            >
                <FaCartShopping /> Add
            </Button>
        )

    } else {

        const loginAction = () => {
            toast({
                title: "User Not Log In",
                description: "User need to login to add Products in Cart",
            })
        }

        return (
            <Button
                className="bg-primary-light rounded-lg text-primary hover:bg-primary hover:text-white"
                onClick={() => loginAction()}
            >
                <FaCartShopping /> Add
            </Button>
        )
    }


}

export default AddtoCartButton