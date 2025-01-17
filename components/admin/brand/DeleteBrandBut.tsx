"use client";
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';

// icons
import { FaTrashCan } from "react-icons/fa6";

// data
import { deleteBrandById } from '@/lib/ApiFunctions/Brands';

  const deleteBrand = async (id: string) => {

    const res = await deleteBrandById(id);

    return res;

  }

const DeleteBrandBut = ({ params }: { params: { _id: string, name: string } }) => {

  const { toast } = useToast();
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      className="h-8 w-8 p-0 text-white"
      onClick={() =>
        deleteBrand(params._id)
          .then((data) => {
            if (data?.success) {
              toast({
                title: "Done",
                description: `${data.message}`
              })
              router.refresh()
            } else {
              toast({
                variant: "destructive",
                title: "Fail",
                description: `${data.message}`
              })
            }
          })
      }
    >
      <FaTrashCan />
    </Button>
  )
}

export default DeleteBrandBut