import React from "react";
import Image from "next/image";

// data
import { GetProductById } from "@/lib/Helpers/Products";
import { GetCategoryData, GetCategoryIdData } from '@/lib/Helpers/Category';

// type
import { categoryType } from '@/lib/Helpers/Category';

// components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import AddCartSection from "@/components/AddCartSection";

// icons
import { TbHome } from "react-icons/tb";

const products = async ({ params }: { params: { id: string } }) => {

  const ProductData = await GetProductById(params.id);

  const CategorieData = await GetCategoryData();

  const CategoryIdData = await GetCategoryIdData(ProductData.category)

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
              <BreadcrumbPage><h4 className='text-sm '>{ProductData.name}</h4></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section>
        <div className="container relative flex gap-5">
          <article className="w-full">
            <div className="product-wrapper">
              <div className="product-detail flex gap-5 mb-5">
                <div className="w-full max-w-sm rounded-xl border border-border-color overflow-hidden">
                  <Image src={ProductData.img} alt={ProductData.name} width={400} height={400}></Image>
                </div>
                <div className="w-full px-4">
                  <h6 className="px-6 py-1 text-sm bg-secondary w-fit rounded-xl">{CategoryIdData.name}</h6>
                  <h3 className="text-4xl text-blue font-bold">{ProductData.name}</h3>
                  <h6 className="text-gray text-base w-25">
                    <div className="product-rate bg-[url('/rating-stars.png')] d-inline-block mr-2">
                      <div
                        className="product-rating bg-[url('/rating-stars.png')]"
                        style={{ width: `${ProductData.rating * 10}%` }}
                      ></div>
                    </div>
                    ({ProductData.rating.toFixed(1)} reviews)
                  </h6>
                  <div className="flex items-center gap-5">
                    <h4 className="text-5xl text-primary font-semibold">
                      $
                      {(
                        ProductData.price -
                        (ProductData.price * ProductData.discount) / 100
                      ).toFixed(2)}
                    </h4>
                    <div className="">
                      <h6 className="text-base font-medium text-secondary">{`${ProductData.discount}% Off`}</h6>
                      <h5 className="text-xl text-gray font-semibold line-through">
                        ${ProductData.price}
                      </h5>
                    </div>
                  </div>
                  <h6>{ProductData.description}</h6>
                  <AddCartSection stock={ProductData.stock} />
                  <div className="flex mt-7">
                    <div className="w-6/12">
                      <ul>
                        <li className="text-sm text-gray mb-2">MFG: <span className="text-primary">Jun 4.2024</span></li>
                        <li className="text-sm text-gray">Stock: <span className="text-primary">{ProductData.stock} Items In Stock</span></li>
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
              <div className="product-discription text-gray p-10 border border-gray rounded-lg">
                <h1 className="text-2xl text-primary">Description</h1>
                <hr className="text-gray my-2" />
                <p>
                  Uninhibited carnally hired played in whimpered dear gorilla
                  koala depending and much yikes off far quetzal goodness and
                  from for grimaced goodness unaccountably and meadowlark near
                  unblushingly crucial scallop tightly neurotic hungrily some
                  and dear furiously this apart.
                </p>
                <p>
                  Spluttered narrowly yikes left moth in yikes bowed this that
                  grizzly much hello on spoon-fed that alas rethought much
                  decently richly and wow against the frequent fluidly at
                  formidable acceptably flapped besides and much circa far over
                  the bucolically hey precarious goldfinch mastodon goodness
                  gnashed a jellyfish and one however because.
                </p>
                <hr className="text-gray my-2" />
                <p>
                  Laconic overheard dear woodchuck wow this outrageously taut
                  beaver hey hello far meadowlark imitatively egregiously hugged
                  that yikes minimally unanimous pouted flirtatiously as beaver
                  beheld above forward energetic across this jeepers
                  beneficently cockily less a the raucously that magic upheld
                  far so the this where crud then below after jeez enchanting
                  drunkenly more much wow callously irrespective limpet.
                </p>
              </div>
            </div>
          </article>
          <aside className="w-full h-fit max-w-xs">
            <div className="p-4 border rounded-xl mb-5 shadow">
              <h4 className='text-2xl text-blue font-bold mb-5'>Category</h4>
              <ul className='flex flex-col gap-3'>
                {CategorieData.map((value: categoryType, index: number) => {
                  return (
                    <li className='flex items-center gap-3 font-semibold border border-border-color rounded-lg py-2 px-4 hover:shadow hover:border-primary-light hover:text-primary' key={index}>
                      <Image src={value.img} alt={value.name} width={30} height={30}></Image>
                      {value.name}
                    </li>
                  )
                })}
              </ul>
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
