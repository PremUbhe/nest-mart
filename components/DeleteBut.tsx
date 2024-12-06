"use client";
import React from 'react'
import { useToast } from "@/hooks/use-toast"

// icons
import { FaTrashCan } from "react-icons/fa6";

const DeleteBut = () => {

  const { toast } = useToast()

  const deleteBrand = () => {

    toast({
      title: `Delete Data`,
      description: "Data Deleted successfully",
    })

  }
  return (
    <button className='p-2 text-white bg-red-600 rounded-lg' type='button' onClick={() => deleteBrand()}><FaTrashCan /></button>
  )
}

export default DeleteBut