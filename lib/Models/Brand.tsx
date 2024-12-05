import mongoose, {Schema, Document} from "mongoose";

export interface Brand extends Document {
    name: string;
}

const BrandSchema : Schema<Brand> = new Schema({
    name : {
        type: String,
        required: [true, "categore name is required"],
        unique: true,
    }
})

export const BrandModel = (mongoose.models.brands as mongoose.Model<Brand>) || mongoose.model<Brand>("brands", BrandSchema)