'use server';

import { z } from 'zod'
import bcrypt from "bcryptjs"

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/Models/User";
import { signUpSchema } from '../Schemas/signUpSchema';
import { sendVerificationEmail } from "@/lib/Mails/sendVerificationEmail";

const RegisterAction = async (values: z.infer<typeof signUpSchema>) => {

    const validatedFileds = signUpSchema.safeParse(values);

    if (!validatedFileds.success) {
        return { error: "Invalid fields" }
    }

    await dbConnect();

    try {

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username: values.username,
            isVerified: true
        });

        if (existingUserVerifiedByUsername) {
            return { error: "Username is already taken" }
        }

        const existingUserByEmail = await UserModel.findOne({
            email: values.email
        });

        if (existingUserByEmail) {
            return { error: "User already exists" }
        }

        const hashedPassword = await bcrypt.hash(values.password, 10)

        const verifyCode = Math.floor(10000 + Math.random() * 900000).toString()

        const newUser = new UserModel({
            username: values.username,
            email: values.email,
            password: hashedPassword,
            verifyCode: verifyCode,
            isVerified: false,
        })

        const res = await newUser.save()

        if (!res) {
            return { error: "Something went wrong while saving the user." }
        }

        const emailResponse = await sendVerificationEmail(
            values.email,
            values.username,
            verifyCode
        )

        if (!emailResponse) {
            return { error: "Error while sending email" }
        }

        return { success: "User register Successfully" }

    } catch (error) {
        console.error(error);
        return { error: "An unexpected error occurred. Please try again." };
    }

}

export default RegisterAction