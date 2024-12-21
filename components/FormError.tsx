import React from 'react'
import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
    message?: string;
};

const FormError = ({ message }: FormErrorProps) => {

    if (!message) return null;

    return (
        <div className='flex items-center gap-3 bg-red-200 px-4 py-2 rounded-md text-red-500'>
            <FaExclamationTriangle className='h-4 w-5' />
            <p className='text-sm'>{message}</p>
        </div>
    )
}

export default FormError