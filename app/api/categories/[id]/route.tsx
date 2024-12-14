import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CategoryModel from "@/lib/Models/Category";


export async function GET(req: Request, context: { params: { id: string } }) {

    const { params } = context;
    const categorieId = params.id;

    try {
        await dbConnect();
        const data = await CategoryModel.findById(categorieId);

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

// delete
export async function DELETE(req: Request, context: { params: { id: string } }) {

    const { params } = context;
    const brandId = params.id;

    try {
        await dbConnect();
        const data = await CategoryModel.findById(brandId);

        if (!data) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        await CategoryModel.findByIdAndDelete(brandId);

        return NextResponse.json(
            { message: "Category successfully deleted", data },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: "Error in Fetching: " + error },
            { status: 500 }
        );
    }
}
