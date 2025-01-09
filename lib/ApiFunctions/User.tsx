import dbConnect from "../dbConnect";
import UserModel from "../Models/User";


// this function is for auth
export async function getUserById(userId: string) {

    await dbConnect();

    try {
        const user = await UserModel.findById(userId)

        if (!user) {
            console.log("User Not found");
            return null;
        }

        return user;

    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }
}


export async function getUserByEmail(email: string | undefined | null) {

    await dbConnect();

    try {

        const user = await UserModel.findOne({ email })

        if (!user) {
            console.log("User Not found");
            return null;
        }

        return user;

    } catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }

}