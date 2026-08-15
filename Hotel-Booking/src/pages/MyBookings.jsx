import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Title from '../Component/Tittle';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets';

const MyBookings = () => {
    const { axios, getToken, currency } = useAppContext();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Get URL parameters (e.g., ?payment=success)
    const [searchParams] = useSearchParams();

    // 1. Function to fetch bookings from the database
    const fetchUserBookings = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const { data } = await axios.get('/api/bookings/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                setBookings(data.bookings);
            }
        } catch (error) {
            console.error("Fetch bookings error:", error);
            toast.error("Failed to load bookings");
        } finally {
            setLoading(false);
        }
    };

    // 2. Initial load and handling redirect messages
    useEffect(() => {
        fetchUserBookings();

        // Check if we just arrived from a successful payment redirect
        const paymentStatus = searchParams.get('payment');
        if (paymentStatus === 'success') {
            toast.success("Payment successful! Your booking is confirmed.");
        } else if (paymentStatus === 'failed') {
            toast.error("Payment failed. Please try again.");
        }
    }, [searchParams]); // Re-run if URL parameters change

    // 3. Handle "Pay Now" button for unpaid bookings
    const handlePayNow = async (booking) => {
        try {
            const token = await getToken();
            toast.loading("Redirecting to payment gateway...");
            
            const { data } = await axios.post('/api/payment/init', {
                bookingId: booking._id,
                amount: booking.totalPrice,
                roomType: booking.room?.roomType || "Hotel Room"
            }, { headers: { Authorization: `Bearer ${token}` } });

            if (data.url) {
                window.location.replace(data.url);
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Could not initiate payment");
        }
    };

    if (loading) return <div className='pt-40 text-center font-medium'>Loading your bookings...</div>;

    return (
        <div className='pt-32 pb-20 px-4 md:px-16 lg:px-24 xl:px-32 min-h-screen bg-white'>
            <Title 
                tittle='My Bookings' 
                subTittle='Easily manage your past, current, and upcoming hotel reservations in one place.' 
                align='left'
            />

            <div className='max-w-6xl mt-12 w-full'>
                {/* Table Header */}
                <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-200 font-bold text-gray-500 text-sm pb-4 uppercase tracking-wider'>
                    <div>Hotels</div>
                    <div>Date & Timings</div>
                    <div className='text-center'>Payment</div>
                </div>

                {/* Bookings List */}
                <div className='flex flex-col'>
                    {bookings.length > 0 ? (
                        bookings.map((item, index) => (
                            <div key={index} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-100 py-8 items-center gap-6'>
                                
                                {/* Hotel Info */}
                                <div className='flex flex-col sm:flex-row gap-5'>
                                    <img src={item.room?.images?.[0] || assets.placeholder} className='w-full sm:w-48 h-32 object-cover rounded-xl shadow-sm' alt="" />
                                    <div className='flex flex-col justify-center'>
                                        <h3 className='text-xl font-bold text-gray-800'>{item.hotel?.name} <span className='text-sm font-medium text-gray-400'>({item.room?.roomType})</span></h3>
                                        <p className='text-sm text-gray-500 mt-1'>📍 {item.hotel?.address}</p>
                                        <p className='text-sm text-gray-500 mt-1'>👥 Guests: {item.guests}</p>
                                        <p className='text-lg font-bold text-blue-600 mt-2'>Total: Tk.{item.totalPrice}</p>
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className='grid grid-cols-2 md:flex md:flex-col gap-4 text-sm'>
                                    <div>
                                        <p className='font-bold text-gray-400 uppercase text-[10px]'>Check-In</p>
                                        <p className='text-gray-700 font-medium'>{new Date(item.checkInDate).toDateString()}</p>
                                    </div>
                                    <div>
                                        <p className='font-bold text-gray-400 uppercase text-[10px]'>Check-Out</p>
                                        <p className='text-gray-700 font-medium'>{new Date(item.checkOutDate).toDateString()}</p>
                                    </div>
                                </div>

                                {/* Payment Status */}
                                <div className='flex flex-col items-center justify-center gap-3'>
                                    {item.isPaid ? (
                                        <div className='flex items-center gap-2 text-green-600 bg-green-50 px-4 py-1.5 rounded-full text-sm font-bold border border-green-100'>
                                            <div className='w-2 h-2 rounded-full bg-green-600 animate-pulse'></div>
                                            Paid
                                        </div>
                                    ) : (
                                        <>
                                            <div className='flex items-center gap-2 text-red-500 bg-red-50 px-4 py-1.5 rounded-full text-sm font-bold border border-red-100'>
                                                <div className='w-2 h-2 rounded-full bg-red-500'></div>
                                                Unpaid
                                            </div>
                                            <button 
                                                onClick={() => handlePayNow(item)}
                                                className='text-xs font-bold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 px-6 py-2 rounded-lg transition-all active:scale-95'
                                            >
                                                Pay Now
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='py-20 text-center text-gray-400 border-2 border-dashed rounded-3xl mt-10'>
                            <p className='text-lg'>You don't have any bookings yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;