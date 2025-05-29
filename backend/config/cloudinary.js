import { v2 as cloudinary } from 'cloudinary';
import SecretModel from '../models/const&secretsModel.js';

const connectCloudinary = async () => {
  try {
    const secret = await SecretModel.findOne({ name: 'cloudinary_config' });

    if (!secret) {
      throw new Error('Cloudinary конфигурацията не е намерена в базата данни.');
    }

    const { cloud_name, api_key, api_secret } = secret.key;

    cloudinary.config({
      cloud_name,
      api_key,
      api_secret
    });

    console.log("Cloudinary connected successfully from DB");
  } catch (err) {
    console.error("Error connecting to Cloudinary:", err.message);
  }
};

export default connectCloudinary;
