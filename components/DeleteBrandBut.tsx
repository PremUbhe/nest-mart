"use client";
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// icons
import { FaTrashCan } from "react-icons/fa6";

// data
import { DeleteBrandById } from '@/lib/ApiFunctions/Brands';

const DeleteBrandBut = ({ params }: { params: { _id: string, name: string } }) => {

  const deleteBrand = async () => {

    await DeleteBrandById(params._id);

    toast({
      title: `${params.name}`,
      description: "Brand Deleted successfully",
    })
    router.refresh();
  }

  const { toast } = useToast();

  const router = useRouter();

  return (
    <button className='p-2 text-white bg-red-600 rounded-lg' type='button' onClick={() => deleteBrand()}><FaTrashCan /></button>
  )
}

export default DeleteBrandBut