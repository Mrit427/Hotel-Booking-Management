import Offer from "../models/Offer.js";
import { v2 as cloudinary } from "cloudinary";

// @desc    Add a new live offer (Admin Only)
// @route   POST /api/offers/add
export const addOffer = async (req, res) => {
    try {
        const { title, description, priceOff, expiryDate } = req.body;

        // Check if image is uploaded via Multer
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Offer image is required" });
        }

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Create the offer document in MongoDB
        const createdOffer = await Offer.create({
            title,
            description,
            priceOff: Number(priceOff),
            expiryDate,
            image: result.secure_url
        });

        res.status(201).json({ 
            success: true, 
            message: "Live offer added successfully!", 
            offer: createdOffer 
        });
    } catch (error) {
        console.error("Add Offer Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all live offers for Home Page (Public)
// @route   GET /api/offers/
export const getOffers = async (req, res) => {
    try {
        const allOffers = await Offer.find({}).sort({ createdAt: -1 });
        res.json({ success: true, offers: allOffers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete an offer (Admin Only)
// @route   DELETE /api/offers/:id
export const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Offer.findByIdAndDelete(id);
        
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Offer not found" });
        }

        res.json({ success: true, message: "Offer removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};