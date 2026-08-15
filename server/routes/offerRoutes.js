import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { addOffer, getOffers } from "../controllers/offerControllers.js";

const offerRouter = express.Router();

offerRouter.get('/', getOffers); // Public
offerRouter.post('/add', protect, isAdmin, upload.single('image'), addOffer); // Admin only

export default offerRouter;