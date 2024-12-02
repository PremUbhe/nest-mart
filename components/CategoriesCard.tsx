import React from "react";
import Image from "next/image";
// import { TypeOf } from "zod";

export type categoreType = {
  _id: string,
  name: string,
  img: string
}

export default async function CategoriesCard() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    }
  );
  const CategorieData = await res.json();

  return (
    <div className="flex flex-row gap-4 overflow-x-auto">
      {CategorieData.data.map((data: categoreType, index: string) => {
        return (
          <div
            className="categorie-card px-8 py-7 border rounded-xl shadow overflow-hidden border-transparent relative"
            key={index}
          >
            <Image src={data.img} alt="img" width={100} height={100}></Image>
            <h3 className="text-blue font-bold">{data.name}</h3>
          </div>
        );
      })}
    </div>
  );
}