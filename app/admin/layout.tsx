import type { Metadata } from "next";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/AppSidebar"
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Nest Mart | Admin",
  description: "",
};

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col bg-black text-white w-full h-screen p-2">
        <div className="p-1 bg-black-secondary rounded-lg mb-2">
          <SidebarTrigger />
        </div>
        <div className="p-2 h-full bg-black-secondary rounded-lg">
          {children}
          <Toaster />
        </div>
      </main>
    </SidebarProvider>
  );
}
