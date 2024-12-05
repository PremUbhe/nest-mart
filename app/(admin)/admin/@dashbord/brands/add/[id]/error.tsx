"use client";

import { useEffect } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center p-5 border rounded-lg m-5 border-primary">
      <h2 className="text-xl mb-4">Something went wrong!</h2>
      <button className="flex gap-2 items-center bg-primary py-2 px-4 rounded-lg"
        onClick={
          () => reset()
        }
      >
        Try again 
        <FaArrowRotateRight />
      </button>
    </div>
  );
}
