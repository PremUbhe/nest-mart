import mongoose, { Schema, Document } from "mongoose";

export interface UserCart extends Document {
    productId: string;
    quantity: number;
}
export interface UserWishlist extends Document {
    productId: string;
}

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    cart: UserCart[]
    type: "user" | "vendor" | "master";
    wishlist: UserWishlist[];
    verifyCode: string;
    isVerified: boolean;
}

const UserCartSchema: Schema<UserCart> = new Schema({
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});
const UserWishlistSchema: Schema<UserWishlist> = new Schema({
    productId: {
        type: String,
        required: true
    }
});



const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "User Name is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    cart: {
        type: [UserCartSchema],
        default: []
    },
    wishlist: {
        type: [UserWishlistSchema],
        default: []
    },
    type: {
        type: String,
        enum: ["user", "vendor", "master"],
        required: true,
        default: "user",
    },
    verifyCode: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true
    }
)

const UserModel = (mongoose.models.user as mongoose.Model<User>) || mongoose.model<User>("user", UserSchema)

export default UserModel;