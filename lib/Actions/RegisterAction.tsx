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
        return { error: "User alredy exist" }
    } else {
        const hashedPassword = await bcrypt.hash(values.password, 10)
        
        const newUser = new UserModel({
            username: values.username,
            email: values.email,
            password: hashedPassword,
            isVerified: false,
        })
        
        await newUser.save()
    }
    
    const verifyCode = Math.floor(10000 + Math.random() * 900000).toString()

    const emailResponse = await sendVerificationEmail(
        values.email,
        values.username,
        verifyCode
    )

    if (!emailResponse) {
        return {error: "Error while sending email"}
    }

    return { success: "User register Successfully" }

}

export default RegisterAction