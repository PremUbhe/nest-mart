'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useTransition } from 'react';
import Image from 'next/image';
import loader from "@/public/loaders/type.gif"

// function
import { updateUserCart } from "@/lib/ApiFunctions/UserCart";

// hook
import { useToast } from '@/hooks/use-toast';

// ui
import { Button } from '@/components/ui/button';

// icons
import { FaCartShopping } from "react-icons/fa6";


const AddtoCartButton = ({ productId, quantity }: { productId: string, quantity: number }) => {

    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession();
    const { toast } = useToast()

    if (session) {

        const userId: string = session.user.id
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

        return (
            <Button
                className="relative bg-primary-light rounded-lg text-primary hover:bg-primary hover:text-white"
                onClick={() => addCartAction()}
                disabled={isPending}
            >
                {isPending === true ? (
                    <Image src={loader} width={50} alt='loading ...' unoptimized />
                ) : (
                    <div className="flex gap-3">
                        <FaCartShopping /> <h4>Add</h4>
                    </div>
                )}
            </Button>
        )

    } else {

        const loginAction = () => {
            toast({
                variant: "destructive",
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