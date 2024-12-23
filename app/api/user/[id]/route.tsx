import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
// model
import UserModel from "@/lib/Models/User";
// type
import { UserCart } from "@/lib/Models/User";


export async function GET(req: Request, context: { params: { id: string } }) {

    const { params } = context;
    const userId = params.id;

    try {
        await dbConnect();

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "User ID is required" },
                { status: 400 }
            );
        }

        const data = await UserModel.findById(userId);

        if (!data) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data, success: true, message: "we found the User" }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error in Fetching: " + error },
            { status: 500 }
        );
    }
}


export async function PUT(req: NextRequest, context: { params: { id: string } }) {

    const { params } = context;
    const userId = params.id;

    const {productId, quantity} : UserCart  = await req.json();
    
    try {
        await dbConnect();
        
        const user = await UserModel.findById(userId);

        if(!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const cart = await user.cart;

        const productIndex = cart.findIndex((item: { productId: string }) => item.productId === productId);

        if(productIndex === -1) {
            cart.push({productId, quantity} as UserCart)
        } else {
            cart[productIndex].quantity += quantity;
        }

        await user.save();

        return NextResponse.json(
            { success: true, message: "Data updated successfully" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error in Fetching: " + error },
            { status: 400 }
        );
    }

}