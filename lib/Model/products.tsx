import mongoose, {Schema, Document, ObjectId} from "mongoose";

export interface productsSchema extends Document {
    name: string;
    img: string;
    price: number;
    rating: number;
    discount: number;
    categories: ObjectId;
    brand: ObjectId;
    stock: number;
    description: string;
}

const productsModel : Schema<productsSchema> = new Schema({
    name : {
        type: String,
        required: [true, "User Name is required"],
        unique: true,
    },
    img : {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating : {
        type: Number,
        required: true,
    },
    discount : {
        type : Number,
    },
    categories : {
        type : Schema.Types.ObjectId,
        required: true,
    },
    brand : {
        type : Schema.Types.ObjectId,
        required: true,
    },
    stock : {
        type : Number,
        required: true,
    },
    description : {
        type: String,
    },

})

export const Products = (mongoose.models.products as mongoose.Model<productsSchema>)  || mongoose.model<productsSchema>("products", productsModel)