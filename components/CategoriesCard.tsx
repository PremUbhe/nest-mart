import React from "react";
// import Image from "next/image";

type categore = {
  _id : string,
  name: string
}

export default async function CategoriesCard() {
  const res = await fetch(
    `${process.env.BASE_URL}/api/categories`,
    {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    }
  );
  const CategorieData = await res.json();

  return (
    <div className="flex flex-row gap-4 ">
      {CategorieData.data.map((data: categore, index: string) => {
        return (
          <div
            className="categorie-card px-8 py-7 border rounded-xl shadow overflow-hidden border-transparent relative"
            key={index}
          >
            <h3>{data.name}</h3>
          </div>
        );
      })}
    </div>
  );
}