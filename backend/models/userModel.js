import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rank: { type: String, required: true, default: `4`},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    moneyspent: {type: Number, default: 0},
    cartData: { type: Object, default: {} }
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel