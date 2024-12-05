import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { BrandModel } from "@/lib/Models/Brand";

// get
export async function GET(req: Request, context: { params: { id: string } }) {

    const { params } = context;
    const brandId = params.id;

    try {
        await dbConnect();
        const data = await BrandModel.findById(brandId);

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

// delete
export async function DELETE(req: Request, context: { params: { id: string } }) {

    const { params } = context;
    const brandId = params.id;

    try {
        await dbConnect();
        const data = await BrandModel.findById(brandId);

        if (!data) {
            return NextResponse.json(
                { error: "brand not found" },
                { status: 404 }
            );
        }

        await BrandModel.findByIdAndDelete(brandId);

        return NextResponse.json(
            { message: "Brand successfully deleted", data },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: "Error in Fetching: " + error },
            { status: 500 }
        );
    }
}

// update
export async function PUT(req: Request, context: { params: { id: string } }) {

    const { params } = context;
    const brandId = params.id;

    const { name } = await req.json();


    try {
        await dbConnect();
        const data = await BrandModel.findById(brandId);

        if (!data) {
            return NextResponse.json(
                { error: "brand not found" },
                { status: 404 }
            );
        }

        const updatedBrand = await BrandModel.findByIdAndUpdate(
            brandId,
            name,
            { new: true }
        );

        return NextResponse.json(
            { message: "Brand successfully updated", updatedBrand },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: "Error in Fetching: " + error },
            { status: 500 }
        );
    }
}