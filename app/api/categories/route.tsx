import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CategoryModel from "@/lib/Models/categoreModel";

export async function GET() {
  try {
    await dbConnect();
    const data = await CategoryModel.find();

    if (!data) {
      return NextResponse.json(
        { error: "data not found" },
        { status: 400 }
      )
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: "Error in Fetching: " + error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {

  const { name, img }: { name: string, img: string } = await req.json();

  console.log(name, img);

  try {
    await dbConnect();

    const newCategory = new CategoryModel({
      name,
      img
    })

    await newCategory.save()

    return NextResponse.json({
      success: true,
      message: "Category is added Successfully"
    }, { status: 200 })

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error while adding categories" },
      { status: 500 }
    )

  }

}