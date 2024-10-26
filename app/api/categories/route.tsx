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

    return NextResponse.json({ data });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Error in Fetching: " + error },
      { status: 500 }
    );
  }
}
