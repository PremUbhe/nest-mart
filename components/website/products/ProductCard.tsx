import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

// img
import loader from "@/public/loaders/type.gif"

// data
import { getCategoryId } from "@/lib/ApiFunctions/Category";
import { getBrandById } from "@/lib/ApiFunctions/Brands";
import { getQuantityOfProductFromUserCart } from "@/lib/ApiFunctions/UserCart";

// type
import { productType } from "@/lib/ApiFunctions/Products";

// component
import AddtoCartButton from "./AddtoCartButton";

// session
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const ProductCard = async ({ params }: { params: productType }) => {

  const session = await getServerSession(authOptions);

  const userId = session?.user.id
  const productId = params._id

  const quantity = await getQuantityOfProductFromUserCart({ userId, productId })
  const categoryData = await getCategoryId(params.category)
  const brandData = await getBrandById(params.brand)

  return (
    <div className="product-card p-7 rounded-xl hover:border-primary-light hover:shadow-lg">
      <Link href={`/products/${params._id}`}>
        <Image
          src={params.img}
          height={320}
          width={320}
          alt="product image"
        />
        <div className="flex mb-3 justify-end">
        <h6 className="px-6 py-1 font-semibold text-sm bg-secondary w-fit rounded-xl">{categoryData.data?.name}</h6>
        </div>
        <h3 className="text-lg mb-2 font-medium">{params.name}</h3>
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
          <span className="text-primary font-semibold"> {brandData.success ? brandData.data?.name : "none"}</span>
        </h5>
      </Link>
      <div className="flex justify-between mt-5">
        <h6 className="font-bold text-2xl text-primary">
          ₹
          {(
            params.price -
            (params.price * params.discount) / 100
          ).toFixed(2)}{" "}
          <span className="text-base font-semibold text-gray line-through">
            ₹{params.price}
          </span>
        </h6>
        <Suspense fallback={
          <Image src={loader} width={50} alt='loading ...' unoptimized />
        }>
          <AddtoCartButton stock={params.stock} productId={params._id} quantityCount={quantity ? quantity : 1} />
        </Suspense>
      </div>
    </div>
  );
}

export default ProductCard;
