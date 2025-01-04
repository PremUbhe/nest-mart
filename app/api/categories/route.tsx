import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CategoryModel, { Category } from "@/lib/Models/Category";

type ApiResponse = {
  success: boolean,
  message: string,
  data?: Category[]
}

// Get
export async function GET(): Promise<NextResponse<ApiResponse>> {

  try {
    await dbConnect();

    const categoryData = await CategoryModel.find();

    if (!categoryData) {
      return NextResponse.json(
        { success: false, message: "data not found" },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, message: "Category data found", data: categoryData }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error in Fetching: " + error },
      { status: 500 }
    );
  }
};

// Update
export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {

  const { name, img, imgId }: { name: string, img: string, imgId: string } = await req.json();

  try {
    await dbConnect();

    const newCategory = new CategoryModel({
      name,
      img,
      imgId,
    });

    const res = await newCategory.save();

    if (!res) {
      return NextResponse.json({
        success: false,
        message: "Error while adding category"
      }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      message: "Category is added Successfully"
    }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error while adding categories" },
      { status: 500 }
    );
  }
};