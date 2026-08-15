import Review from "../models/Review.js";
import Hotel from "../models/Hotel.js";


// @desc    Add a reviewimport Review from "../models/Review.js";

// @desc    Add a review with a manual display name
export const addReview = async (req, res) => {
    try {
        const { hotelId, rating, comment, reviewerName } = req.body;
        const userId = req.user._id;

        // CRITICAL FIX: We strictly use reviewerName from the frontend form
        const review = await Review.create({
            hotel: hotelId,
            user: userId,
            username: reviewerName, // This saves your manual input
            rating: Number(rating),
            comment: comment
        });

        res.status(201).json({ success: true, message: "Review added!", review });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get reviews for a specific hotel
export const getHotelReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ hotel: req.params.hotelId }).sort({ createdAt: -1 });
        res.json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// @desc    Get all reviews for an admin's hotels
export const getOwnerReviews = async (req, res) => {
    try {
        const userId = req.user._id;
        const myHotels = await Hotel.find({ owner: userId });
        const hotelIds = myHotels.map(h => h._id);

        const reviews = await Review.find({ hotel: { $in: hotelIds } })
            .populate("hotel", "name")
            .sort({ createdAt: -1 });
            
        res.json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};