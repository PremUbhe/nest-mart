import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CategoryModel, { Category } from "@/lib/Models/Category";

type ApiResponse = {
    success: boolean,
    message: string,
    data?: Category
}

// get
export async function GET(req: Request, context: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {

    const { params } = context;
    const categorieId = params.id;

    try {
        await dbConnect();
        const categoryData = await CategoryModel.findById(categorieId);

        if (!categoryData) {
            return NextResponse.json(
                { success: false, message: "Categorie not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Categorie data found", data: categoryData },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error in Fetching: " + error },
            { status: 500 }
        );
    }

}

// delete
export async function DELETE(req: Request, context: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {

    const { params } = context;
    const brandId = params.id;

    try {
        await dbConnect();
        const categoryData = await CategoryModel.findById(brandId);

        if (!categoryData) {
            return NextResponse.json(
                { success: false, message: "Category not found" },
                { status: 404 }
            );
        }

        const res = await CategoryModel.findByIdAndDelete(brandId);

        if (!res) {
            return NextResponse.json(
                { success: false, message: "Error while deleting Category" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Category successfully deleted", data: categoryData },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error in Fetching: " + error },
            { status: 500 }
        );
    }
};
