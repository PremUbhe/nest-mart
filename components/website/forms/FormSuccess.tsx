import React from 'react'
import { FaCheckCircle } from "react-icons/fa";

interface FormSuccessProps {
    message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {

    if (!message) return null;

    return (
        <div className='flex items-center gap-3 bg-emerald-200 px-4 py-2 rounded-md text-emerald-500'>
            <FaCheckCircle className='h-4 w-5' />
            <p className='text-sm'>{message}</p>
        </div>
    )
}

export default FormSuccess