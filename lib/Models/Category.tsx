import mongoose, {Schema, Document} from "mongoose";

export interface Category extends Document {
    name: string;
    img: string;
    imgId: string;
}

const CategorySchema : Schema<Category> = new Schema({
    name : {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
    },
    img : {
        type: String,
        required: [true, "Category image is required"]
    },
    imgId : {
        type: String,
        required: true,
    }
})

const CategoryModel = (mongoose.models.category as mongoose.Model<Category>) || mongoose.model<Category>("category", CategorySchema)

export default CategoryModel