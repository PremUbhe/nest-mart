import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { brands } from "@/lib/Models/brandModel";


export async function GET(req: Request, context: { params: { id: string } }) {

    const { params } = context;
    const brandId = params.id;

    try {
        await dbConnect();
        const data = await brands.findById(brandId);

        if (!data) {
            return NextResponse.json(
                { error: "brand not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data }, { status: 200 });


    } catch (error) {
        return NextResponse.json(
            { error: "Error in Fetching: " + error },
            { status: 500 }
        );
    }

}