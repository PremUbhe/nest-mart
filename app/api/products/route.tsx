import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ProductModel } from "@/lib/Models/Product";


export async function GET() {
  try {
    await dbConnect();

    const data = await ProductModel.find();

    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: "Error in Fetching: " + error },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {

  const { name, img, price, rating, discount, category, brand, stock, description }: { name: string, img: string, price: number, rating: number, discount: number, category: string, brand: string, stock: number, description: string; } = await req.json();

  try {
    await dbConnect();

    const newProduct = new ProductModel({
      name,
      img,
      price,
      rating,
      discount,
      category,
      brand,
      stock,
      description

    })

    await newProduct.save()

    return NextResponse.json({
      success: true,
      message: "Product is added Successfully"
    }, { status: 200 })

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error while adding Product" },
      { status: 500 }
    )

  }

}
