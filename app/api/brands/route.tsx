import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { BrandModel } from "@/lib/Models/Brand";

// get
export async function GET() {
  try {
    await dbConnect();
    const data = await BrandModel.find();

    if (!data) {
      return NextResponse.json(
        { error: "data not found" },
        { status: 400 }
      )
    }

    return NextResponse.json({ data });

  } catch (error) {
    return NextResponse.json(
      { error: "Error in Fetching: " + error },
      { status: 500 }
    );
  }
}

// add
export async function POST(req: Request) {

  const { name } = await req.json();
  try {
    await dbConnect();

    const newBrands = new BrandModel({ name })

    await newBrands.save()

    return NextResponse.json({
      success: true,
      message: "brands is added Successfully"
    }, { status: 200 })

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error while adding Brands" },
      { status: 500 }
    )

  }

}