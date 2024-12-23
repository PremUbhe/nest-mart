import { UserCart, UserWishlist } from "../Models/User";

export type userType = {
    _id: string
    username: string;
    email: string;
    password: string;
    cart: UserCart[]
    type: "user" | "vendor" | "master";
    wishlist: UserWishlist[];
    verifyCode: string;
    isVerified: boolean;
}

export async function GetUserData(userId : string): Promise<userType> {


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`,
        {
            headers: { Accept: "application/json", },
            method: "GET",
            cache: "no-store",
            next: { tags: ['user'] },
        }
    )

    if (!res.ok) {
        throw new Error(`User API call failed with status ${res.status}`)
    }

    const data = await res.json()

    return data.data
}