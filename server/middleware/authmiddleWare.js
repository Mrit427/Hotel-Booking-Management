import User from "../models/user.js";
import { getAuth, clerkClient } from "@clerk/express";

export const protect = async (req, res, next) => {
    try {
        // ১. Clerk থেকে ইউজারের সেশন আইডি নেওয়া হচ্ছে
        const { userId } = getAuth(req);
        
        if (!userId) {
            return res.status(401).json({ success: false, message: "Please Login First" });
        }
        
        // ২. ডাটাবেজে ইউজার আছে কি না চেক করা হচ্ছে
        let user = await User.findById(userId);

        // ৩. যদি ইউজার ডাটাবেজে না থাকে (অর্থাৎ ngrok বন্ধ ছিল)
        if (!user) {
            console.log("--- [WEBHOOK BYPASS] Syncing user data directly from Clerk ---");
            
            // সরাসরি Clerk API থেকে ইউজারের তথ্য নিয়ে আসা
            const clerkUser = await clerkClient.users.getUser(userId);
            const email = clerkUser.emailAddresses[0].emailAddress;

            // ডাটাবেজে নতুন ইউজার তৈরি করা
            user = await User.create({
                _id: userId,
                clerkId: userId,
                email: email,
                username: `${clerkUser.firstName} ${clerkUser.lastName}`.trim() || "Guest User",
                image: clerkUser.imageUrl,
                // আপনার এডমিন ইমেইল চেক
                role: email === "mrittikamazumder72@gmail.com" ? "hotelOwner" : "user"
            });
            console.log("--- [SUCCESS] User profile created without ngrok ---");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Error:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'hotelOwner') {
        next();
    } else {
        res.status(403).json({ success: false, message: "Admin access required" });
    }
};