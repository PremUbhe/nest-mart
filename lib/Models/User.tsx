import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    cart: Array<string>
    type: "user" | "vendor" | "master";
    wishlist: Array<string>;
    verifyCode: string;
    isVerified: boolean;
}

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
        type: [String],
        default: []
    },
    wishlist: {
        type: [String],
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