import React from "react";
import Image from "next/image";
import loader from "@/public/loading.gif";

const loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center z-50 bg-white">
      <Image src={loader} alt="loading ..." unoptimized />
    </div>
  );
};

export default loading;
