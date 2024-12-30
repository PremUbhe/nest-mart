"use client";
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';

// icons
import { FaTrashCan } from "react-icons/fa6";

// data
import { deleteCategoryById } from '@/lib/ApiFunctions/Category';

const deleteCategory = async (id: string) => {

  const res = await deleteCategoryById(id);

  return res;

}

const DeleteCategoryBut = ({ params }: { params: { _id: string, name: string } }) => {

  const { toast } = useToast();
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      className="h-8 w-8 p-0 text-white"
      onClick={() =>
        deleteCategory(params._id)
          .then((data) => {
            if (data?.success) {
              toast({
                title: "Done",
                description: `${data.message}`
              });
              router.refresh()
            } else {
              toast({
                variant: "destructive",
                title: "Fail",
                description: `${data.message}`
              });
            }
          })
      }
    >
      <FaTrashCan />
    </Button>
  )
}

export default DeleteCategoryBut