import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { addReview, getHotelReviews, getOwnerReviews } from "../controllers/reviewControllers.js";

const reviewRouter = express.Router();

// For all logged in users (Everyone can review)
reviewRouter.post('/add', protect, addReview); 

// Public
reviewRouter.get('/hotel/:hotelId', getHotelReviews);

// Only for the specific Admin to see all reviews in dashboard
reviewRouter.get('/owner', protect, isAdmin, getOwnerReviews);

export default reviewRouter;