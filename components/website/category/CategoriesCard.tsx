import React from "react";
import Image from "next/image";

// data
import { getCategoryData } from "@/lib/ApiFunctions/Category";

// type
import { categoryType } from "@/lib/ApiFunctions/Category";

export default async function CategoriesCard() {

  const CategorieData = await getCategoryData();

  return (
    <div className="flex flex-row py-3 gap-4 overflow-x-auto">
      {CategorieData.data?.map((data: categoryType, index: number) => {
        return (
          <div
            className="categorie-card relative px-8 py-7 border rounded-xl overflow-hidden hover:bg-white hover:shadow-lg hover:border-primary-light"
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