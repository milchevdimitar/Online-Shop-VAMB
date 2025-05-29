import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
    try {
      const {
        name,
        description,
        serial_num,
        price,
        category,
        subCategory,
        bestseller,
        compatibleModels
      } = req.body;
  
      const files = req.files;
  
      const imagesUrl = await Promise.all(
        files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image"
          });
          return result.secure_url;
        })
      );
  
      const productData = {
        name,
        description,
        serial_num,
        price: Number(price),
        category,
        subCategory,
        bestseller: bestseller === "true",
        image: imagesUrl,
        compatibleModels: compatibleModels
          ? compatibleModels.split(",").map((model) => model.trim())
          : [],
        date: Date.now()
      };
  
      const product = new productModel(productData);
      await product.save();
  
      res.json({ success: true, message: "Product Added" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };
