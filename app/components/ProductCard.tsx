import React from "react";
import Image from "next/image";
import Link from "next/link";

// component
// import ProductModal from "./ProductModal";


export default function ProductCard({ products }: any) {
  return (
    <>
      <div className="product-card w-80 p-7 rounded-xl hover:border-primary hover:shadow-lg">
        <Link href={`/products/${products._id}`}>
          <Image
            src={products.img}
            height={320}
            width={320}
            // placeholder="blur"
            alt="product image"
          />
          <h6 className="text-gray text-sm">{products.categories}</h6>
          <h3 className="text-xl truncate overflow-hidden">{products.name}</h3>
          <h6 className="text-gray text-sm w-25">
            <div className="product-rate d-inline-block mr-2">
              <div
                className="product-rating"
                style={{ width: `${products.rating * 10}%` }}
              ></div>
            </div>
            ({products.rating.toFixed(1)})
          </h6>
          <h5 className="text-gray text-sm">
            By <span className="text-primary">{products.brand}</span>
          </h5>
        </Link>
        <div className="flex justify-between mt-5">
          <h6 className="text-2xl text-primary">
            $
            {(
              products.price -
              (products.price * products.discount) / 100
            ).toFixed(2)}{" "}
            <span className="text-base text-gray line-through">
              ${products.price}
            </span>
          </h6>
          {/* <ProductModal products={products}/> */}
        </div>
      </div>
    </>
  );
}
