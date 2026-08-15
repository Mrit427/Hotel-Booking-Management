import Booking from "../models/Booking.js";
import Room from "../models/Rooms.js";
import Hotel from "../models/Hotel.js";

// @desc    Create a new booking (Ensuring real-time DB sync)
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests, paymentMethod } = req.body;
        const userId = req.user._id;

        // 1. Fetch Room from DB to get the ACTIVE Hotel ID
        const roomData = await Room.findById(room);
        if (!roomData) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        console.log(`\n--- [NEW BOOKING ATTEMPT] ---`);
        console.log(`Room: ${roomData.roomType} | Linked Hotel: ${roomData.hotel}`);

        // 2. Calculate Price
        const nights = Math.ceil(Math.abs(new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)) || 1;
        const totalPrice = nights * roomData.pricePerNight;

        // 3. Create Booking - Forcing use of roomData.hotel
        const newBooking = await Booking.create({
            user: userId,
            room: room,
            hotel: roomData.hotel, // THIS IS THE FIX
            checkInDate,
            checkOutDate,
            totalPrice,
            guests: Number(guests),
            paymentMethod,
            status: paymentMethod === "Pay At Hotel" ? "confirmed" : "pending",
            isPaid: false
        });

        console.log(`SUCCESS: Booking ${newBooking._id} linked to Hotel ${roomData.hotel}`);
        res.status(201).json({ success: true, booking: newBooking });

    } catch (error) {
        console.error("BOOKING ERROR:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Admin Dashboard Stats
export const getHotelBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("\n--- [DASHBOARD REFRESH] ---");

        // 1. Find all hotels owned by this admin
        const myHotels = await Hotel.find({ owner: userId });
        const hotelIds = myHotels.map(h => h._id);

        // 2. Fetch all bookings for these specific hotels
        const bookings = await Booking.find({ hotel: { $in: hotelIds } })
            .populate("room user hotel")
            .sort({ createdAt: -1 });

        // 3. Calculate Stats
        const validBookings = bookings.filter(b => b.room !== null);
        const totalRevenue = validBookings
            .filter(b => b.isPaid === true || b.paymentMethod === "Pay At Hotel")
            .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

        console.log(`Dashboard Stats -> Bookings: ${validBookings.length}, Revenue: ${totalRevenue}`);

        res.json({ 
            success: true, 
            dashboardData: {
                totalBookings: validBookings.length,
                totalRevenue,
                bookings: validBookings
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Admin manually marks a booking as paid (This fixes your SyntaxError)
export const markBookingAsPaid = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { isPaid: true, status: 'confirmed' },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        res.json({ success: true, message: "Payment confirmed successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get current user's personal bookings
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate("room hotel")
            .sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Check room availability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const bookings = await Booking.find({
            room,
            status: { $ne: "cancelled" },
            $or: [
                { checkInDate: { $lt: checkOutDate, $gte: checkInDate } },
                { checkOutDate: { $gt: checkInDate, $lte: checkOutDate } }
            ]
        });
        res.json({ success: true, isAvailable: bookings.length === 0 });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};