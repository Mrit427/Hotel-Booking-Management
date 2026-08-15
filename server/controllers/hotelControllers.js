import Hotel from "../models/Hotel.js";
import User from "../models/user.js";

// @desc    Register a new hotel and update user role
export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const ownerId = req.user._id;

        // Check if hotel already exists
        const existing = await Hotel.findOne({ owner: ownerId, name });
        if (existing) return res.json({ success: false, message: "Hotel already exists" });

        // Create Hotel
        const newHotel = await Hotel.create({
            name, address, contact, city, owner: ownerId
        });

        // Update User Role to hotelOwner
        await User.findByIdAndUpdate(ownerId, { role: "hotelOwner" });

        res.status(201).json({ success: true, message: "Hotel registered! You are now an Admin." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get owner's hotel list for dropdown
export const getOwnerHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({ owner: req.user._id }).select("name _id");
        res.json({ success: true, hotels });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};