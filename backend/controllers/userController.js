import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js"; // Добави импорта за модела на поръчките

// Функция за изчисляване на ранк
const calculateRank = (moneyspent) => {
    if (moneyspent > 10000) return 1;
    if (moneyspent > 5000) return 2;
    if (moneyspent > 1000) return 3;
    return 4;
};

// Актуализира ранковете за всички потребители
const updateUserRanks = async (req, res) => {
    try {
        const users = await userModel.find();

        for (const user of users) {
            // Изчисляване на общия оборот за потребителя
            const orders = await orderModel.find({ user: user._id });
            const moneyspent = orders.reduce((sum, order) => sum + order.amount, 0);

            user.moneyspent = moneyspent; // Обновяване на полето moneyspent
            user.rank = calculateRank(moneyspent); // Обновяване на ранка
            await user.save();
        }

        res.status(200).json({ message: "Rank Renewed." });
    } catch (error) {
        res.status(500).json({ message: "RankRenew Error.", error });
    }
};

// Връща информация за текущия потребител
const getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found 404" });
        }

        // Изчисляване на общия оборот за текущия потребител
        const orders = await orderModel.find({ user: user._id });
        const moneyspent = orders.reduce((sum, order) => sum + order.amount, 0);

        user.moneyspent = moneyspent; // Обновяване на полето moneyspent
        user.rank = calculateRank(moneyspent); // Обновяване на ранка
        await user.save(); // Запазване на обновените данни

        res.status(200).json({
            rank: user.rank,
            moneyspent: user.moneyspent,
        });
    } catch (error) {
        res.status(500).json({ message: "Error loading data - 500", error });
    }
};

// Функция за създаване на токен
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Останалите функции са непроменени

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

export { loginUser, registerUser, adminLogin, updateUserRanks, getUserDetails };
