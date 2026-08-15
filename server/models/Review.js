import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    user: { type: String, ref: "User", required: true },
    username: { type: String, required: true },
    userImage: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);