import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    contact: string;
    password: string;
    location: string;
    cart: Array<string>
    type: "user" | "vendor" | "master";
    wishlist: Array<string>;
    // verifyCode : string;
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
        match: [/.+\@.+\..+/, "please use a valid email address"]
    },
    contact: {
        type: String,
        required: [true, "Contact No is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
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
    isVerified: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true // Automatically adds createdAt and updatedAt
    }
)

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;