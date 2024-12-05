import React from "react";
import Image from "next/image";
import Link from "next/link";

// data
import { getCategoryIdData } from "@/lib/helpers/category";
import { getBrandById } from "@/lib/helpers/brands";

// type
import { productType } from "@/lib/helpers/products";

const ProductCard = async ({ params }: { params: productType }) => {

  const categoryData = await getCategoryIdData(params.category)
  const brandData = await getBrandById(params.brand)

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
          <h6 className="text-gray text-sm">{categoryData.name}</h6>
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
            By
            <span className="text-primary">{brandData.name}</span>
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
