import mongoose, {Schema, Document} from "mongoose";

export interface Product extends Document {
    name: string;
    img: string;
    price: number;
    rating: number;
    discount: number;
    category: string;
    brand: string;
    stock: number;
    description: string;
}

const ProductSchema : Schema<Product> = new Schema({
    name : {
        type: String,
        required: [true, "product Name is required"],
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
    category : {
        type : String,
        required: true,
    },
    brand : {
        type : String,
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

export const ProductModel = (mongoose.models.products as mongoose.Model<Product>)  || mongoose.model<Product>("products", ProductSchema)