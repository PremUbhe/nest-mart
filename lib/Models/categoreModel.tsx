import mongoose, {Schema, Document} from "mongoose";

export interface Category extends Document {
    name: string;
    img: string;
}

const CategorySchema : Schema<Category> = new Schema({
    name : {
        type: String,
        required: [true, "categore name is required"],
        unique: true,
    },
    img : {
        type: String,
        required: [true, "categore img is required"]
    }
})

const CategoryModel = (mongoose.models.categories as mongoose.Model<Category>) || mongoose.model<Category>("categories", CategorySchema)

export default CategoryModel