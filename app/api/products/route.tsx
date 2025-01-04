import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ProductModel, Product } from "@/lib/Models/Product";

type ApiResponse = {
  success: boolean,
  message: string,
  data?: Product[]
}

// get
export async function GET(): Promise<NextResponse<ApiResponse>> {

  try {
    await dbConnect();

    const res = await ProductModel.find();

    if (!res) {
      return NextResponse.json(
        { success: false, message: "Product data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product data found", data: res },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error in Fetching: " + error },
      { status: 500 }
    );
  }
}

// add
export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {

  const { name, img, imgId, price, rating, discount, category, brand, stock, description }: { name: string, img: string, imgId: string, price: number, rating: number, discount: number, category: string, brand: string, stock: number, description: string; } = await req.json();

  try {
    await dbConnect();

    const newProduct = new ProductModel({
      name,
      img,
      imgId,
      price,
      rating,
      discount,
      category,
      brand,
      stock,
      description
    });

    const res = await newProduct.save();

    if (!res) {
      return NextResponse.json(
        { success: false, message: "Error while adding Product data" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product is added Successfully"
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong !" + error },
      { status: 500 }
    );
  }
};
