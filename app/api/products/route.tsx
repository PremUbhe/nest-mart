import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Products } from "@/lib/Model/products";


export async function GET() {
  try {
    await dbConnect();

    const data = await Products.find();

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error in Fetching: " + error.message },
      { status: 500 }
    );
  }
}
