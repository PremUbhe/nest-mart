import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const quicksand = localFont({
  src: "./fonts/Quicksand-Regular.ttf",
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Nest Mart",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={` ${quicksand.variable} antialiased`}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>

    </html>
  );
}
