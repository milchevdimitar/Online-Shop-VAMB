import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    serial_num: { type: String, unique: true },
    price: { type: Number, required: true },
    category: { type: String },
    subCategory: { type: String },
    bestseller: { type: Boolean, default: false },
    image: { type: [String] },
    compatibleModels: { type: [String], default: [] },
    date: { type: Date, default: Date.now }
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
