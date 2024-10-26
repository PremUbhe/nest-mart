import React from "react";
import Image from "next/image";
import Link from "next/link";
import { productType } from "../page";


const ProductCard = async ({ params }: { params: productType }) => {

  const categorieId = params.categorie_id;
  const brandId = params.brand_id;

  const categorieAPI = await fetch(
    `${process.env.BASE_URL}/api/categories/${categorieId}`,
    {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    }
  );

  const categorieName: { data: { _id: string, name: string } } = await categorieAPI.json();

  const brandAPI = await fetch(
    `${process.env.BASE_URL}/api/brands/${brandId}`,
    {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    }
  );

  const brandName: { data: { _id: string, name: string } } = await brandAPI.json();

  return (
    <>
      <div className="product-card w-80 p-7 rounded-xl hover:border-primary hover:shadow-lg">
        <Link href={`/products/${params._id}`}>
          <Image
            src={params.img}
            height={320}
            width={320}
            // placeholder="blur"
            alt="product image"
          />
          <h6 className="text-gray text-sm">{categorieName.data.name}</h6>
          <h3 className="text-xl truncate overflow-hidden">{params.name}</h3>
          <h6 className="text-gray text-sm w-25">
            <div className="product-rate d-inline-block mr-2">
              <div
                className="product-rating"
                style={{ width: `${params.rating * 10}%` }}
              ></div>
            </div>
            ({params.rating.toFixed(1)})
          </h6>
          <h5 className="text-gray text-sm">
            By <span className="text-primary">{brandName.data.name}</span>
          </h5>
        </Link>
        <div className="flex justify-between mt-5">
          <h6 className="text-2xl text-primary">
            $
            {(
              params.price -
              (params.price * params.discount) / 100
            ).toFixed(2)}{" "}
            <span className="text-base text-gray line-through">
              ${params.price}
            </span>
          </h6>
          <button className="py-2 px-4 bg-primary-light rounded-lg text-primary hover:bg-primary hover:text-white">  Add</button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
