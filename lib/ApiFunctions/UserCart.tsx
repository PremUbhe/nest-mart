"use server"

import dbConnect from "../dbConnect";
import UserModel from "../Models/User";
import { UserCart } from "../Models/User";

type ApiResponse = {
  success: boolean,
  message: string,
}


export const updateUserCart = async ({ params }: { params: { userId: string, productId: string, quantity: number } }): Promise<ApiResponse> => {

  const { userId, productId, quantity } = params;

  await dbConnect();

  try {

    const user = await UserModel.findById(userId);

    if (!user) {
      return { success: false, message: "User not found" }
    }

    const cart = await user.cart

    const productIndex = cart.findIndex((item) => item.productId === productId);

    if (productIndex === -1) {
      cart.push({ productId, quantity } as UserCart)

      const res = await user.save();
      if (!res) {
        return { success: false, message: "Unable to add the product" }
      }
      return { success: true, message: "Product add in successfully" }

    } else {
      cart[productIndex].quantity = quantity;

      const res = await user.save();
      if (!res) {
        return { success: false, message: "Unable to update product count" }
      }
      return { success: true, message: "Product count updated successfully" }

    }

  } catch (error) {
    return { success: false, message: "Somethig went wrong!" + error }
  }

}

export const getQuantityOfProductFromUserCart = async({ userId, productId } : {userId : string, productId : string}) : Promise<number | null> => {

  await dbConnect();

  const user = await UserModel.findById(userId);

  if (!user) {
    console.log("user not found")
    return null;
  }

  try {

    const cart = await user.cart

    const productIndex = cart.findIndex((item) => item.productId === productId);

    if (productIndex === -1) {
      return null;

    } else {
      const quantity = cart[productIndex].quantity;
      return quantity;
    }
    
  } catch (error) {
    console.log("something went wrong" + error)
    return null
  }

}