import Hotel from "../models/Hotel.js";
import Room from "../models/Rooms.js";
import { v2 as cloudinary } from "cloudinary";


// @route   GET /api/rooms/owner
export const getOwnerRooms = async (req, res) => {
    try {
        console.log("\n--- [DEBUG] ROOM LISTING REQUEST ---");
        
        const userId = req.user?._id;
        console.log("Step 1: Authenticated User ID:", userId);

        if (!userId) {
            console.log("Step 1 Fail: User not found in request.");
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // 2. Find hotels owned by this user
        const userHotels = await Hotel.find({ owner: userId });
        console.log(`Step 2: Found ${userHotels.length} hotels for this user.`);

        if (!userHotels || userHotels.length === 0) {
            console.log("Step 2 End: No hotels found. Returning empty list.");
            return res.json({ success: true, rooms: [], message: "No hotels registered yet." });
        }

        const hotelIds = userHotels.map(h => h._id);
        console.log("Step 2 Success: Target Hotel IDs:", hotelIds);

        // 3. Find rooms belonging to those hotels
        const rooms = await Room.find({ hotel: { $in: hotelIds } }).sort({ createdAt: -1 });
        console.log(`Step 3 Success: Fetched ${rooms.length} total rooms from DB.`);

        console.log("--- [DEBUG END: SUCCESS] ---\n");
        res.json({ success: true, rooms });

    } catch (error) {
        console.error("\n!!! [CRITICAL ERROR IN getOwnerRooms] !!!");
        console.error("Message:", error.message);
        console.error("Stack Trace:", error.stack);
        console.error("----------------------------------------\n");
        
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
};

// ... keep other functions (createRoom, deleteRoom) exactly as they were
// @desc    Add a new room to a specific hotel
// @route   POST /api/rooms/
export const createRoom = async (req, res) => {
    try {
        const { hotelId, roomType, pricePerNight, amenities } = req.body;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Selected hotel not found" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "Please upload room images" });
        }

        // Upload images to Cloudinary
        const uploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path));
        const results = await Promise.all(uploadPromises);
        const imageUrls = results.map(r => r.secure_url);

        // Create room and link to Hotel
        const newRoom = await Room.create({
            hotel: hotelId,
            hotelName: hotel.name, 
            roomType,
            pricePerNight: Number(pricePerNight),
            amenities: JSON.parse(amenities),
            images: imageUrls,
        });

        res.status(201).json({ success: true, message: "Room added successfully!", room: newRoom });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all available rooms for Home Page (Public)
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true }).populate('hotel').sort({ createdAt: -1 });
        // Filter out rooms if the linked hotel was deleted
        const validRooms = rooms.filter(r => r.hotel !== null);
        res.json({ success: true, rooms: validRooms });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single room details by ID (Public)
export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate('hotel');
        if (!room) return res.status(404).json({ success: false, message: "Room not found" });
        res.json({ success: true, room });
    } catch (error) {
        res.status(500).json({ success: false, message: "Invalid Room ID" });
    }
};

// @desc    Get all rooms for the owner's dashboard (Admin)

// @desc    Delete a room (Admin)
// server/controllers/roomControllers.js

export const deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params; // Matches :roomId from route

        const deletedRoom = await Room.findByIdAndDelete(roomId);

        if (!deletedRoom) {
            return res.status(404).json({ success: false, message: "Room not found in database" });
        }

        res.json({ success: true, message: "Room deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// @desc    Toggle room availability (Admin)
// THIS IS THE FUNCTION THAT WAS MISSING AND CAUSED THE CRASH
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;
        const roomData = await Room.findById(roomId);
        
        if (!roomData) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        
        res.json({ success: true, message: "Room status updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};