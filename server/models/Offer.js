import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priceOff: { type: Number, required: true }, // e.g., 25 for 25% OFF
    expiryDate: { type: String, required: true }, // e.g., "Aug 31"
    image: { type: String, required: true }, // Cloudinary URL
}, { timestamps: true });

export default mongoose.model("Offer", offerSchema);