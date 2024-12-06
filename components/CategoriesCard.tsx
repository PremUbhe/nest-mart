import React from "react";
import Image from "next/image";

// data
import { GetCategoryData } from "@/lib/Helpers/Category";

// type
import { categoryType } from "@/lib/Helpers/Category";

export default async function CategoriesCard() {

  const CategorieData = await GetCategoryData();

  return (
    <div className="flex flex-row py-3 gap-4 overflow-x-auto">
      {CategorieData.map((data: categoryType, index: number) => {
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