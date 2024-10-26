import mongoose, {Schema, Document} from "mongoose";

export interface categorieSchema extends Document {
    name: string;
}

const categorieModel : Schema<categorieSchema> = new Schema({
    name : {
        type: String,
        required: [true, "categore name is required"],
        unique: true,
    }
})

export const categories = (mongoose.models.categories as mongoose.Model<categorieSchema>) || mongoose.model<categorieSchema>("categories", categorieModel)