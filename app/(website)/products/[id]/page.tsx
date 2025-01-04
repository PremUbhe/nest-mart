import React from "react";
import Image from "next/image";

// data
import { getProductById } from "@/lib/ApiFunctions/Products";
import { getCategoryData, getCategoryId } from '@/lib/ApiFunctions/Category';
import { getQuantityOfProductFromUserCart } from "@/lib/ApiFunctions/UserCart";

// type
import { categoryType } from '@/lib/ApiFunctions/Category';

// components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import AddCartSection from "@/components/website/products/AddCartSection";

// icons
import { TbHome } from "react-icons/tb";

// session
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const products = async ({ params }: { params: { id: string } }) => {

  const productId = params.id

  const session = await getServerSession(authOptions);

  const userId = session?.user.id

  const product = await getProductById(productId);

  const productData = product.data

  if(!productData) {
    return <h1>Product not found</h1>;
  }

  const categorieData = await getCategoryData();

  const categoryIdData = await getCategoryId(productData.category)

  const quantity = await getQuantityOfProductFromUserCart({ userId, productId })

  return (
    <>
      <section className='p-4 ps-14 border-b'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home"><h4 className='flex items-center gap-1 text-sm'><TbHome /> Home</h4></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products"><h4 className='flex items-center gap-1 text-sm'>Products</h4></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage><h4 className='text-sm '>{productData.name}</h4></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section>
        <div className="container relative flex gap-5">
          <article className="w-full">
            <div className="product-wrapper">
              <div className="product-detail flex gap-5 mb-5">
                <div className="w-full max-w-sm rounded-xl border border-border-color overflow-hidden ">
                  <Image src={productData.img} alt={productData.name} width={400} height={400}></Image>
                </div>
                <div className="w-full px-4">
                  <h6 className="px-6 py-1 font-semibold text-sm bg-secondary w-fit rounded-xl mb-3">{categoryIdData.data?.name}</h6>
                  <h3 className="text-4xl text-blue leading-tight font-bold">{productData.name}</h3>
                  <h6 className="text-gray text-base w-25 mb-3">
                    <div className="product-rate bg-[url('/rating-stars.png')] d-inline-block mr-2">
                      <div
                        className="product-rating bg-[url('/rating-stars.png')]"
                        style={{ width: `${productData.rating * 10}%` }}
                      ></div>
                    </div>
                    ({productData.rating.toFixed(1)} reviews)
                  </h6>
                  <div className="flex items-center gap-5 mb-5">
                    <h4 className="text-5xl text-primary font-semibold">
                      ₹
                      {(
                        productData.price -
                        (productData.price * productData.discount) / 100
                      ).toFixed(2)}
                    </h4>
                    <div className="">
                      <h6 className="text-base font-medium text-secondary">{`${productData.discount}% Off`}</h6>
                      <h5 className="text-xl text-gray font-semibold line-through">
                        ₹{productData.price}
                      </h5>
                    </div>
                  </div>
                  <AddCartSection stock={productData.stock} productId={params.id} quantityCount={quantity ? quantity : 1} />
                  <div className="flex mt-7">
                    <div className="w-6/12">
                      <ul>
                        <li className="text-sm text-gray mb-2">MFG: <span className="text-primary">Jun 4.2024</span></li>
                        <li className="text-sm text-gray">Stock: <span className="text-primary">{productData.stock} Items In Stock</span></li>
                      </ul>
                    </div>
                    <div className="w-6/12">
                      <ul>
                        <li className="text-sm text-gray mb-2">LIFE: <span className="text-primary">70 days</span></li>
                        <li className="text-sm text-gray">Tags: <span className="text-primary">Snack, Organic, Brown</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-discription p-10 border border-border-color rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-primary">Description</h1>
                <hr className="text-gray my-2" />
                <p className="text-base text-blue">{productData.description}</p>
              </div>
            </div>
          </article>

          <aside className="w-full h-fit max-w-xs">
            <div className="p-4 border rounded-xl mb-5 shadow">
              <h4 className='text-2xl text-blue font-bold mb-5'>Category</h4>
              {categorieData.data ? (
                <ul className='flex flex-col gap-3'>
                  {categorieData.data?.map((value: categoryType, index: number) => {
                    return (
                      <li className='flex items-center gap-3 font-semibold border border-border-color rounded-lg py-2 px-4 hover:shadow hover:border-primary-light hover:text-primary' key={index}>
                        <Image src={value.img} alt={value.name} width={30} height={30}></Image>
                        {value.name}
                      </li>
                    )
                  })}
                </ul>

              ) : (
                <p>Category not found</p>
              )}
            </div>
            <div className="border bg-banner-Juice bg-cover rounded-xl overflow-hidden">
              <div className="px-7 py-28">
                <h6 className="text-gray text-md">Oganic</h6>
                <h3 className="text-blue text-2xl font-semibold">Save 17% <br /> on <span className="text-primary">Oganic</span> <br /> Juice</h3>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default products;
