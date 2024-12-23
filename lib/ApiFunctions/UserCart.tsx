"use server"

import dbConnect from "../dbConnect";

export const AddtoCart = async ({ params }: { params: { userId: string, productId: string, quantity: number } }) => {

  const { userId, productId, quantity } = params;

  try {

    await dbConnect();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`,
      {
        headers: { Accept: "application/json", },
        method: "PUT",
        cache: "no-store",
        next: { tags: ['user'] },
        body: JSON.stringify({ productId, quantity })
      }
    )

    if (!res.ok) {
      return { success: false, message: `User API call failed with status ${res.status}` }
    }

    return { success: true, message: "Product successfully added in Cat" }

  } catch (error) {
    return { success: false, message: "Somethig whent wrong!"+ error }
  }

};

