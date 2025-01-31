import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import { calculateRank } from "./userController.js";

const currency = 'bgn'
const deliveryCharge = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address, delivery_company_name } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
            delivery_company: delivery_company_name
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        await updateUserMoneySpent(userId, orderData.amount);

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address, delivery_company_name } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
            delivery_company: delivery_company_name
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => {
            const parts = item.split(' x ');
            const productName = parts[0];
            const quantity = parseInt(parts[1]);
            const unitPrice = parseFloat(parts[2]);

            return {
                price_data: {
                    currency: currency,  
                    product_data: {
                        name: productName
                    },
                    unit_amount: unitPrice * 100  
                },
                quantity: quantity
            };
        });

        line_items.push({
            price_data: {
                currency: currency, 
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100  
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await updateUserMoneySpent(userId, order.amount);
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateUserMoneySpent = async (userId, amount) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) return;

        user.moneyspent = (user.moneyspent || 0) + amount;
        user.rank = calculateRank(user.moneyspent);
        await user.save();
    } catch (error) {
        console.error("Error updating user money spent:", error);
    }
};


export { verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, updateUserMoneySpent }
