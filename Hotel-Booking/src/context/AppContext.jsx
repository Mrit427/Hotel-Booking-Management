import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

// Configure base URL for backend API
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Clerk hooks for authentication
    const { user } = useUser();
    const { getToken } = useAuth();

    // --- Global Application States ---
    const [rooms, setRooms] = useState([]); // Stores real-time rooms from DB
    const [isOwner, setIsOwner] = useState(false); // Admin access status
    const [showHotelReg, setShowHotelReg] = useState(false); // Controls the Hotel Registration Modal
    const currency = import.meta.env.VITE_CURRENCY || "৳"; // Currency symbol

    /**
     * 1. Fetch all available rooms from MongoDB (Public)
     * Used by Home page and Featured Destination
     */
    const fetchAllRooms = async () => {
    try {
        const { data } = await axios.get('/api/rooms/');
        if (data.success) {
            setRooms(data.rooms); // If database is empty, this will be []
        } else {
            setRooms([]); 
        }
    } catch (error) {
        console.error("Fetch rooms failed:", error.message);
        setRooms([]); // Stop the spinner on error
    }
};
    /**
     * 2. Fetch User Role and verify Admin status (Private)
     * This calls your backend /api/user which checks the MongoDB role
     */
    const fetchUserRole = async () => {
        try {
            const token = await getToken();
            if (!token) return;

            const { data } = await axios.get('/api/user', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                // If database role is 'hotelOwner', show the Admin Dashboard button
                setIsOwner(data.role === "hotelOwner");
                console.log("Admin verification successful:", data.role === "hotelOwner");
            }
        } catch (error) {
            console.error("AppContext Error (fetchUserRole):", error.message);
            setIsOwner(false);
        }
    };

    /**
     * 3. Effect: Initial public data load
     */
    useEffect(() => {
        fetchAllRooms();
    }, []);

    /**
     * 4. Effect: Re-fetch role whenever the user logs in or out via Clerk
     */
    useEffect(() => {
        if (user) {
            fetchUserRole();
        } else {
            setIsOwner(false);
        }
    }, [user]);
// Inside AppProvider
const [offers, setOffers] = useState([]);

const fetchLiveOffers = async () => {
    try {
        const { data } = await axios.get('/api/offers/');
        if (data.success) {
            setOffers(data.offers);
        }
    } catch (error) {
        console.error("Failed to load offers");
    }
};

useEffect(() => {
    fetchLiveOffers();
}, []);

// Add 'offers' and 'fetchLiveOffers' to the value object
   const value = {
        user,
        rooms,
        setRooms,
        isOwner,
        setIsOwner,
        getToken,
        axios,
        showHotelReg,
        setShowHotelReg,
        currency,
        fetchAllRooms, // Used in AddRoom.jsx to refresh Home page data
        fetchUserRole,
        offers, 
        fetchLiveOffers,  // Used to update role status after hotel registration
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook for convenient context access
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};