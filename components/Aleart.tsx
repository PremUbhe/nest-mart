"use client"
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface AleartProps {
    params: string;
}

const Aleart  = ({ params } : AleartProps) => {

    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        toast({
            title: `${params}`,
            description: "Brand Added successfully",
        });

        const timer = setTimeout(() => {
            router.push("/admin/brands");
        }, 2000);

        return () => clearTimeout(timer);

    }, [params, router, toast]);

    return null;
}

export default Aleart