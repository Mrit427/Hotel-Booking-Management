import express from 'express';
import { 
    createBooking, 
    getUserBookings, 
    getHotelBookings, 
    checkAvailabilityAPI 
} from '../controllers/bookingControllers.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
// ... existing imports
import { markBookingAsPaid } from '../controllers/bookingControllers.js';

const bookingRouter = express.Router();

// Public route to check availability
bookingRouter.post('/check-availability', checkAvailabilityAPI);

// User protected routes (Everyone can book)
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);

// Admin Only routes
bookingRouter.get('/hotel', protect, isAdmin, getHotelBookings);
bookingRouter.post('/mark-paid/:bookingId', protect, isAdmin, markBookingAsPaid);

export default bookingRouter;