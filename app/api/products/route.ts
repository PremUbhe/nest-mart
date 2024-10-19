import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Products } from "@/lib/Models/productModel";


export async function GET() {
  try {
    await dbConnect();

    const data = await Products.find();

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Error in Fetching: " + error },
      { status: 500 }
    );
  }
}
