import React from "react";
import Image from "next/image";

// data
import { getCategoryData } from "@/lib/helpers/category";

// type
import { categoryType } from "@/lib/helpers/category";

export default async function CategoriesCard() {

  const CategorieData = await getCategoryData();

  return (
    <div className="flex flex-row gap-4 overflow-x-auto">
      {CategorieData.map((data: categoryType, index: number) => {
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