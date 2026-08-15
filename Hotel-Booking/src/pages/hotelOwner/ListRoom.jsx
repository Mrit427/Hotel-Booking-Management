import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ListRoom = () => {
    const { axios, getToken } = useAppContext();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Function to fetch all rooms for this admin
    const fetchRooms = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const { data } = await axios.get('/api/rooms/owner', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setRooms(data.rooms);
            }
        } catch (error) {
            console.error("Fetch Rooms Error:", error);
            toast.error("Failed to load rooms");
        } finally {
            setLoading(false);
        }
    };

    // 2. NEW: Function to Delete a Room
    const handleDelete = async (roomId) => {
        // Confirmation dialog before deleting
        if (!window.confirm("Are you sure you want to delete this room?")) return;

        try {
            const token = await getToken();
            const { data } = await axios.delete(`/api/rooms/${roomId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                toast.success(data.message);
                // Refresh the list after successful deletion
                fetchRooms(); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error(error.response?.data?.message || "Could not delete room");
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    if (loading) return <div className='p-10 text-center font-medium'>Loading listings...</div>

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-6'>All Listed Rooms</h2>
            
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                <table className='w-full text-left'>
                    <thead className='bg-gray-50 border-b border-gray-200'>
                        <tr>
                            <th className='p-4 font-semibold text-gray-700'>Hotel Name</th>
                            <th className='p-4 font-semibold text-gray-700'>Room Type</th>
                            <th className='p-4 font-semibold text-gray-700'>Price</th>
                            <th className='p-4 font-semibold text-gray-700 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length > 0 ? (
                            rooms.map((room) => (
                                <tr key={room._id} className='border-b border-gray-100 hover:bg-gray-50 transition-colors'>
                                    <td className='p-4 text-gray-600 font-medium'>{room.hotelName}</td>
                                    <td className='p-4 text-gray-600'>{room.roomType}</td>
                                    <td className='p-4 text-gray-600 font-semibold'>${room.pricePerNight}</td>
                                    <td className='p-4 text-center'>
                                        {/* FIXED: Attached handleDelete function here */}
                                        <button 
                                            onClick={() => handleDelete(room._id)}
                                            className='text-red-500 hover:text-red-700 font-bold cursor-pointer transition-all active:scale-90'
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className='p-10 text-center text-gray-400'>
                                    No rooms found. Add a room to see it here.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListRoom;