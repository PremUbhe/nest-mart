import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Products } from "@/lib/Models/productModel";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const productId = params.id;
  
  try {
    await dbConnect();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const data = await Products.findById(productId);

    if (!data) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Error in Fetching: " + error },
      { status: 500 }
    );
  }
}
