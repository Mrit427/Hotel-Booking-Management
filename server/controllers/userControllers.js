import User from "../models/user.js";

export const getUserData = async (req, res) => {
    try {
        console.log("--- [DEBUG] Fetching User Data for ID:", req.user._id);
        const user = await User.findById(req.user._id);

        if (!user) {
            console.log("--- [ERROR] User not found in MongoDB ---");
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Logic for hardcoded Admin Email
        const isAdminEmail = user.email === "mrittikamazumder72@gmail.com";
        const role = isAdminEmail ? "hotelOwner" : "user";

        console.log(`--- [SUCCESS] User: ${user.email} | Role assigned: ${role} ---`);
        res.status(200).json({ success: true, role, email: user.email });

    } catch (error) {
        console.error("--- [CRITICAL ERROR] getUserData failed ---", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};



export const storeRecentSearchedCities = async (req, res) => {
    try {
        const { recentSearchedCity } = req.body;
        const user = await User.findById(req.user._id);
        if (user) {
            if (!user.recentSearchedCities.includes(recentSearchedCity)) {
                user.recentSearchedCities.unshift(recentSearchedCity);
                if (user.recentSearchedCities.length > 3) user.recentSearchedCities.pop();
                await user.save();
            }
            res.json({ success: true, message: "City added" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};