import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/Models/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/lib/Mails/sendVerificationEmail";

export async function POST(req: Request) {
    await dbConnect();

    try {

        const { username, email, password } = await req.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });

        if (existingUserVerifiedByUsername) {
            return NextResponse.json({
                success: false,
                message: "Username is already taken"
            })
        }

        const existingUserByEmail = await UserModel.findOne({email});

        const verifyCode = Math.floor(10000 + Math.random() * 900000).toString()

        if (existingUserByEmail) {
            console.log("user alredy exist")
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                isVerified: false,
            })

            await newUser.save()
        }

        // send verification mail
        const emailResponse =  await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if (!emailResponse) {
            return NextResponse.json({
                success: false,
                message: "error wail sending email"
            }, {status: 500})
        }

        return NextResponse.json({
            success: true,
            message: "User register Successfully"
        }, {status: 200})

    } catch (error) {
        console.error("error registering user" + error)
        return NextResponse.json(
            {
                success: false,
                message: "Error registering user"
            },
            { status: 500 }
        )
    }
}