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
    <div className="relative w-full h-screen p-5 bg-primary ">
      <div className="w-full h-full bg-white flex flex-col justify-center items-center rounded-lg shadow-xl">
      <h2 className="text-xl mb-4">Something went wrong!</h2>
      <button className="flex gap-2 items-center bg-primary py-2 px-4 rounded-lg"
        onClick={
          () => reset()
        }
      >
        Try again
        <FaArrowRotateRight className="animate-spin"/>
      </button>
      </div>
    </div>
  );
}
