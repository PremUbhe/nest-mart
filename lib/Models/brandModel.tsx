import mongoose, {Schema, Document} from "mongoose";

export interface brandSchema extends Document {
    name: string;
}

const brandModel : Schema<brandSchema> = new Schema({
    name : {
        type: String,
        required: [true, "categore name is required"],
        unique: true,
    }
})

export const brands = (mongoose.models.brands as mongoose.Model<brandSchema>) || mongoose.model<brandSchema>("brands", brandModel)