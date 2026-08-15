import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { 
    getRooms, 
    getOwnerRooms, 
    createRoom, 
    deleteRoom, 
    getRoomById, 
    toggleRoomAvailability 
} from "../controllers/roomControllers.js";

const roomRouter = express.Router();

// 1. Static Protected Routes (MUST BE FIRST)
roomRouter.get('/owner', protect, isAdmin, getOwnerRooms);

// 2. Public Routes
roomRouter.get('/', getRooms);

// 3. Dynamic Routes (MUST BE LAST)
roomRouter.get('/:id', getRoomById); 

// 4. Other Admin Actions
roomRouter.post('/', upload.array("images", 4), protect, isAdmin, createRoom);
roomRouter.delete('/:roomId', protect, isAdmin, deleteRoom);
roomRouter.post('/toggle-availability', protect, isAdmin, toggleRoomAvailability);

export default roomRouter;