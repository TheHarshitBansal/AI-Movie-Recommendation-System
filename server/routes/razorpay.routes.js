import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/razorpay.controller.js";

const router = Router();

router.post('/', createOrder);
router.post('/verify', verifyPayment);

export default router;