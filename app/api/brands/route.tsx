import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { brands } from "@/lib/Models/brandModel";

export async function GET() {
  try {
    await dbConnect();
    const data = await brands.find();

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
