import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/Models/User";


export async function GET()  {

    await dbConnect();

    try {

        const data = await UserModel.find()

        if (!data) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { data, success: true, message: "we found user" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error while Feching User" + error },
            { status: 500 }
        )
    }
}