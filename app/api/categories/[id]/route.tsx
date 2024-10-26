import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { categories } from "@/lib/Models/categoreModel";


export async function GET(req: Request, context: { params: { id: string } }) {

    const { params } = context;
    const categorieId = params.id;

    try {
        await dbConnect();
        const data = await categories.findById(categorieId);

        if (!data) {
            return NextResponse.json(
                { error: "Categorie not found" },
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