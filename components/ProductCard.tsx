import React from "react";
import Image from "next/image";
import Link from "next/link";

// components
import { Button } from "./ui/button";

// data
// import { GetCategoryIdData } from "@/lib/ApiFunctions/Category";
import { GetBrandById } from "@/lib/ApiFunctions/Brands";

// type
import { productType } from "@/lib/ApiFunctions/Products";


// icons
import { FaCartShopping } from "react-icons/fa6";

const ProductCard = async ({ params }: { params: productType }) => {

  // const categoryData = await GetCategoryIdData(params.category)
  const brandData = await GetBrandById(params.brand)

  return (
    <div className="product-card p-7 rounded-xl hover:border-primary-light hover:shadow-lg">
      <Link href={`/products/${params._id}`}>
        <Image
          src={params.img}
          height={320}
          width={320}
          // placeholder="blur"
          alt="product image"
        />
        {/* <h6 className="text-gray text-sm">{categoryData.name}</h6> */}
        <h3 className="text-xl font-medium truncate overflow-hidden">{params.name}</h3>
        <h6 className="flex items-center text-gray text-sm w-25">
          <div className="product-rate bg-[url('/rating-stars.png')] d-inline-block mr-2">
            <div
              className="product-rating bg-[url('/rating-stars.png')]"
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
        <h6 className="font-medium text-2xl text-primary">
          $
          {(
            params.price -
            (params.price * params.discount) / 100
          ).toFixed(2)}{" "}
          <span className="text-base text-gray line-through">
            ${params.price}
          </span>
        </h6>
        <Button className="bg-primary-light rounded-lg text-primary hover:bg-primary hover:text-white"><FaCartShopping /> Add</Button>
      </div>
    </div>
  );
}

export default ProductCard;
