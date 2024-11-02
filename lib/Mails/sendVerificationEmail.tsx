import { Resend } from 'resend';

import { VerificatioEmail } from "@/components/mail/VerificationEmail";

export interface ApiResponse {
    success: boolean;
    message?: string;
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification Code | Nest Mart',
            react: VerificatioEmail({ firstName: username, otp: verifyCode }),
        });
        return { success: true, message: 'Verification email send successfully' }
    } catch (error) {
        console.error("Error sending verification email", error)
        return { success: false, message: 'Failed to send verification email' }

    }
}