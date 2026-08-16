import SSLCommerzPayment from 'sslcommerz-lts';
import Booking from "../models/Booking.js";
import 'dotenv/config';

// @desc    Initialize SSLCommerz Payment
export const initPayment = async (req, res) => {
    try {
        const { bookingId, amount, roomType } = req.body;
        const user = req.user;

        const data = {
            total_amount: amount,
            currency: 'BDT',
            tran_id: bookingId, // Using Booking ID as transaction ID
            success_url: `${process.env.BACKEND_URL}/api/payment/success/${bookingId}`,
            fail_url: `${process.env.BACKEND_URL}/api/payment/fail/${bookingId}`,
            cancel_url: `${process.env.BACKEND_URL}/api/payment/cancel/${bookingId}`,
            ipn_url: `${process.env.BACKEND_URL}/api/payment/ipn`,
            shipping_method: 'Courier',
            product_name: roomType || 'Hotel Booking',
            product_category: 'Service',
            product_profile: 'general',
            cus_name: user.username || 'Customer',
            cus_email: user.email || 'customer@mail.com',
            cus_add1: 'Dhaka',
            cus_city: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01700000000',
            ship_name: 'Customer',
            ship_add1: 'Dhaka',
            ship_city: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false);
        sslcz.init(data).then(apiResponse => {
            let GatewayPageURL = apiResponse.GatewayPageURL;
            res.send({ url: GatewayPageURL });
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const paymentSuccess = async (req, res) => {
    try {
        const { tranId } = req.params;
        await Booking.findByIdAndUpdate(tranId, { status: "confirmed", isPaid: true });
        res.redirect(`${process.env.FRONTEND_URL}/my-bookings?payment=success`);
    } catch (error) {
        res.redirect(`${process.env.FRONTEND_URL}/my-bookings?payment=error`);
    }
};

export const paymentFail = async (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/my-bookings?payment=failed`);
};

export const paymentCancel = async (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/my-bookings?payment=cancelled`);
};