import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ProductModel, Product } from "@/lib/Models/Product";

type ApiResponse = {
  success: boolean,
  message: string,
  data?: Product
}

// get
export async function GET(req: Request, context: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {

  const { params } = context;
  const productId = params.id;

  if (!productId) {
    return NextResponse.json(
      { success: false, message: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const data = await ProductModel.findById(productId);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product data found ", data: data },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong ! " + error },
      { status: 500 }
    );
  }
}

// delete
export async function DELETE(req: Request, context: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {

  const { params } = context;
  const productId = params.id;

  if (!productId) {
    return NextResponse.json(
      { success: false, message: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const data = await ProductModel.findById(productId);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    const res = await ProductModel.findByIdAndDelete(productId);

    if(!res) {
      return NextResponse.json(
        { success: false, message: "Error while deleting Product" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product Deleted Successfully" },
      { status: 201 }
    );


  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error in Fetching: " + error },
      { status: 500 }
    );
  }
}


