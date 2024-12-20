import type { Metadata } from "next";

// components
import AdminSidebar from "@/components/AdminSidebar";
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
    title: "Nest Mart | Dashbord",
    description: "Generated by create next app",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="p-4">
            <div className="flex gap-5">
                <div className="min-w-64">
                    <AdminSidebar />
                </div>
                <div className="dashbord w-full p-5 border border-gray rounded-lg shadow-lg">
                    {children}
                    <Toaster />
                </div>
            </div>
        </section>
    );
}
