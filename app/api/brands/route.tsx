import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { BrandModel, Brand } from "@/lib/Models/Brand";

type ApiResponse = {
  success: boolean,
  message: string,
  data?: Brand[]
}


// get
export async function GET(): Promise<NextResponse<ApiResponse>> {

  try {

    await dbConnect();

    const data = await BrandModel.find();

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Brands data not found" },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, message: "Brands data found", data });

  } catch (error) {
    
    return NextResponse.json(
      { success: false, message: "Something went wrong!: " + error },
      { status: 500 }
    );
  }
}

// add
export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {

  try {

    const { name }: { name: string } = await req.json();

    if (!name) {
      return NextResponse.json({
        success: false,
        message: "Brand name is required.",
      }, { status: 400 });
    }

    await dbConnect();

    const newBrands = new BrandModel({ name })
    const res = await newBrands.save();

    if (!res) {
      return NextResponse.json({
        success: false,
        message: "Error while adding the brand"
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "brand added Successfully"
    }, { status: 201 });

  } catch (error) {

    return NextResponse.json({
      success: false,
      message: "Something went wrong!:" + error
    }, { status: 500 });

  }

}