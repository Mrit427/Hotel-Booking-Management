import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { initPayment, paymentSuccess, paymentFail, paymentCancel } from "../controllers/paymentControllers.js";

const paymentRouter = express.Router();

// Endpoint to start payment: POST /api/payment/init
paymentRouter.post('/init', protect, initPayment);

// SSLCommerz redirects to these after payment (Must be POST as per SSLCommerz docs)
paymentRouter.post('/success/:tranId', paymentSuccess);
paymentRouter.post('/fail/:tranId', paymentFail);
paymentRouter.post('/cancel/:tranId', paymentCancel);

export default paymentRouter;