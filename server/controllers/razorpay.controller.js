import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/user.model.js';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const createOrder = async (req, res) => {
    const { id } = req.body;
    if(!id) {
        return res.status(400).json({ message: "User not logged in" });
    }

    const user = await User.findById(id);
    if(!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if(user.subscription.status === true) {
        return res.status(400).json({ message: "User already has an active subscription"});
    }

    try {
        const order = await razorpay.orders.create({
            amount: 49900,
            currency: 'INR',
            payment_capture: 1
        });

        user.subscription.id = order?.id;
        await user.save();
        res.status(200).json({order, message: "Order created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to access the payment gateway" });
        
    }
};

export const verifyPayment = async (req, res) => {
    const {id, payment_id, signature} = req.body;

    if(!id) {
        return res.status(400).json({ message: "User not logged in" });
    }

    if(!payment_id || !signature) {
        return res.status(400).json({ message: "Payment_ID required" });
    }

    const user = await User.findById(id);

    if(!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if(user.subscription.status === true) {
        return res.status(400).json({ message: "User already has an active subscription"});
    }

  const key_secret = process.env.RAZORPAY_KEY_SECRET;
    const order_id = user.subscription.id;
  const generated_signature = crypto
    .createHmac("sha256", key_secret)
    .update(`${order_id}|${payment_id}`)
    .digest("hex");

  if (generated_signature === signature) {
    user.subscription.status = true;
    await user.save();
    res.status(200).json({ success: true, message: "Payment Completed!", user });
  } else {
    // Payment verification failed
    res.status(400).json({ success: false, message: "Payment Failed!" });
  }
}