import Subscriber from "../models/Subscriber.js";

// @desc    Add a new email to newsletter
export const addSubscriber = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Newsletter request for:", email); // Log for debugging

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Check if email already exists
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.json({ success: false, message: "You are already subscribed!" });
        }

        // Create new subscriber
        await Subscriber.create({ email });
        
        res.status(201).json({ success: true, message: "Thank you for subscribing!" });

    } catch (error) {
        console.error("Subscription Error:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};