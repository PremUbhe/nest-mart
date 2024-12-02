"use client"
import React from 'react'

// icons
import { FaTrashCan } from "react-icons/fa6";


const DeleteBut = () => {

  return (
    <button className='p-2 text-white bg-red-600 rounded-lg' type='button' onClick={()=> console.log("delete")}><FaTrashCan /></button>
  )
}

export default DeleteBut