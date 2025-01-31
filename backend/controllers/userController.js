import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

const calculateRank = (moneyspent) => {
    if (moneyspent > 30000) return 1;
    if (moneyspent > 10000) return 2;
    if (moneyspent > 5000) return 3;
    return 4;
};

const updateUserRanks = async (req, res) => {
    try {
        const users = await userModel.find();

        for (const user of users) {

            const orders = await orderModel.find({ user: user._id });
            const moneyspent = orders.reduce((sum, order) => sum + order.amount, 0);

            user.moneyspent = moneyspent;
            user.rank = calculateRank(moneyspent);
            await user.save();
        }

        res.status(200).json({ message: "Rank Renewed." });
    } catch (error) {
        res.status(500).json({ message: "RankRenew Error.", error });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("User ID from token:", req.user?.id);
        const user = await userModel.findById(userId);
        console.log("Fetched User _ :", user);        

        if (!user) {
            return res.status(404).json({ message: "User not found 404" });
        }

        const orders = await orderModel.find({ user: user._id });

        console.log(user.moneyspent, user.rank); 
        await user.save(); 

        res.status(200).json({
            rank: user.rank,
            moneyspent: user.moneyspent,
        });
    } catch (error) {
        res.status(500).json({ message: "Error loading data - 500", error });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;
        
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await orderModel.deleteMany({ user: userId });
        await userModel.findByIdAndDelete(userId);
        
        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error deleting user", error });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching users", error });
    }
};

export { loginUser, registerUser, adminLogin, updateUserRanks, getUserDetails, calculateRank, deleteUser, listUsers };
