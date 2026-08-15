import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { registerHotel, getOwnerHotels } from "../controllers/hotelControllers.js";

const hotelRouter = express.Router();

// Logic: Any user can attempt registration, but controller blocks non-admins
hotelRouter.post('/register', protect, registerHotel);

// Logic: Only authorized admins can see their hotel list for the room form
hotelRouter.get('/owner-list', protect, isAdmin, getOwnerHotels);

export default hotelRouter;  