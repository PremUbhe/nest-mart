import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { categories } from "@/lib/Models/categoreModel";

export async function GET() {
  try {
    await dbConnect();
    const data = await categories.find();

    if(!data) {
      return NextResponse.json(
        {error: "data not found"},
        {status: 400}
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

  const {name, imgURL} = await req.json();
  try {
    await dbConnect();

    const newCategory = new categories({
      name,
      imgURL
    })
  
    await newCategory.save()

    return NextResponse.json({
      success: true,
      message: "Category is added Successfully"
    }, {status: 200})
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {error: "Error while adding categories"},
      { status: 500}
    )
    
  }
  
}