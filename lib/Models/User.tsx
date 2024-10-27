import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document {
    username : string;
    email : string;
    password : string;
    verifyCode : string;
    isVerified : boolean;
}

const UserSchema : Schema<User> = new Schema ({
    username : {
        type : String,
        required: [true, "User Name is required"],
        trim: true,
        unique: true,
    },
    email : {
        type : String,
        required: [true, "Email is required"],
        unique: true,
        match: [ /.+\@.+\..+/ , "please use a valid email address"]
    },
    password : {
        type : String,
        required: [true, "Password is required"],
    },
    verifyCode : {
        type: String,
        required : [true, "Verify code is required"]
    },
    isVerified : {
        type : Boolean,
        default : false,
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;