import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { BrandModel, Brand } from "@/lib/Models/Brand";

type ApiResponse = {
    success: boolean,
    message: string,
    data?: Brand
}

// Get
export async function GET(req: Request, context: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {

    const { params } = context;
    const brandId = params.id;

    if (!brandId) {
        return NextResponse.json(
            { success: false, message: "Brand id required" },
            { status: 400 }
        );
    }

    try {

        await dbConnect();

        const res = await BrandModel.findById(brandId);

        if (!res) {
            return NextResponse.json(
                { success: false, message: "Brands data not found" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: true, message: "Brands data found", data: res },
            { status: 200 }
        );

    } catch (error) {

        return NextResponse.json(
            { success: false, message: "Something went wrong!: " + error },
            { status: 500 }
        );
    }
}

// Update
export async function PUT(req: Request, context: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {

    const { params } = context;
    const brandId = params.id;

    if (!brandId) {
        return NextResponse.json(
            { success: false, message: "Brand id required" },
            { status: 400 }
        );
    }

    const { name }: { name: string } = await req.json();

    if (!name) {
        return NextResponse.json({
            success: false,
            message: "Brand name is required.",
        }, { status: 400 });
    }

    try {

        await dbConnect();

        const updatedBrand = await BrandModel.findByIdAndUpdate(
            brandId,
            { name },
            { new: true }
        );

        if (!updatedBrand) {
            return NextResponse.json({
                success: false,
                message: "Error while updating the brand"
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "brand updated Successfully"
        }, { status: 201 });

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: "Something went wrong!:" + error
        }, { status: 500 });
    }
};


// Delete
export async function DELETE(req: Request, context: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {

    const { params } = context;
    const brandId = params.id;

    if (!brandId) {
        return NextResponse.json(
            { success: false, message: "Brand id required" },
            { status: 400 }
        );
    }

    try {

        await dbConnect();

        const res = await BrandModel.findById(brandId);

        if (!res) {
            return NextResponse.json(
                { success: false, message: "Brands data not found" },
                { status: 400 }
            )
        }

        const data = await BrandModel.findByIdAndDelete(brandId);

        if (!data) {
            return NextResponse.json(
                { success: false, message: "Error while deleting the brand" },
                { status: 400 }
            )
        }

        return NextResponse.json({
            success: true,
            message: "brand deleted Successfully"
        }, { status: 201 });

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: "Something went wrong!:" + error
        }, { status: 500 });
    }
};