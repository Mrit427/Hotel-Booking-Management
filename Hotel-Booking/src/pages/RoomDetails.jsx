import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useClerk } from "@clerk/clerk-react"; 
import toast from 'react-hot-toast';
import { assets, facilityIcons } from '../assets/assets';

const RoomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { openSignIn } = useClerk();
    const { axios, getToken, user } = useAppContext();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    
    // --- Booking States ---
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Pay At Hotel");

    // --- Review States ---
    const [reviews, setReviews] = useState([]);
    const [reviewerName, setReviewerName] = useState(""); 
    const [userRating, setUserRating] = useState(5);
    const [userComment, setUserComment] = useState("");

    const dummyReviews = [
        { username: "Arif Khan", rating: 5, comment: "Excellent service and very clean environment!", createdAt: new Date() },
        { username: "Nabila Islam", rating: 4, comment: "The stay was very comfortable. Loved the food.", createdAt: new Date() }
    ];

    const fetchRoomData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/rooms/${id}`);
            if (data.success) {
                setRoom(data.room);
                fetchReviews(data.room.hotel._id);
            }
        } catch (error) {
            toast.error("Room not found");
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async (hotelId) => {
        try {
            const { data } = await axios.get(`/api/reviews/hotel/${hotelId}`);
            if (data.success) {
                setReviews([...data.reviews, ...dummyReviews]);
            }
        } catch (error) {
            setReviews(dummyReviews);
        }
    };

    useEffect(() => { if (id) fetchRoomData(); }, [id]);

    const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) return openSignIn();

    setBookingLoading(true);
    try {
        const token = await getToken(); // Clerk থেকে টোকেন নেওয়া হচ্ছে

        // ১. বুকিং ডাটা পাঠানো হচ্ছে
        const response = await axios.post('/api/bookings/book', {
            room: id,
            checkInDate,
            checkOutDate,
            guests: 1,
            paymentMethod 
        }, { 
            headers: { Authorization: `Bearer ${token}` } // টোকেন পাঠানো বাধ্যতামূলক
        });

        if (response.data.success) {
            console.log("Booking successfully saved in DB");
            
            if (paymentMethod === "SSLCommerz") {
                // ২. পেমেন্ট গেটওয়েতে পাঠানো
                const payRes = await axios.post('/api/payment/init', {
                    bookingId: response.data.booking._id,
                    amount: response.data.booking.totalPrice,
                    roomType: room.roomType
                }, { headers: { Authorization: `Bearer ${token}` } });

                if (payRes.data.url) window.location.replace(payRes.data.url);
            } else {
                toast.success("Booking saved! Redirecting...");
                navigate('/my-bookings');
            }
        }
    } catch (error) {
        toast.error("Database save failed: " + error.message);
    } finally {
        setBookingLoading(false);
    }
};
    const submitReview = async (e) => {
        e.preventDefault();
        if (!reviewerName) return toast.error("Please enter your name");
        try {
            const token = await getToken();
            const { data } = await axios.post('/api/reviews/add', {
                hotelId: room.hotel._id, reviewerName, rating: userRating, comment: userComment
            }, { headers: { Authorization: `Bearer ${token}` } });
            if (data.success) {
                toast.success("Review posted!");
                setReviewerName(""); setUserComment(""); fetchReviews(room.hotel._id);
            }
        } catch (error) { toast.error("Failed to post review"); }
    };

    if (loading) return <div className="pt-40 text-center">Loading...</div>;
    if (!room) return <div className="pt-40 text-center">Room Not Found.</div>;

    return (
        <div className='pt-32 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 min-h-screen bg-gray-50'>
            <div className='flex flex-col lg:flex-row gap-12 items-start'>
                
                {/* --- Left Side: Content Flow --- */}
                <div className='flex-1 w-full'>
                    <img src={room.images[0]} className='w-full h-[500px] object-cover rounded-3xl shadow-lg' alt="" />
                    
                    <div className='mt-8'>
                        <h1 className='text-4xl font-bold text-gray-800'>{room.hotelName}</h1>
                        <p className='text-indigo-600 text-xl font-medium mt-1'>{room.roomType}</p>
                        <p className='text-blue-600 text-2xl font-bold mt-4'>Tk.{room.pricePerNight} / night</p>
                    </div>

                    <div className='mt-10'>
                        <h3 className='text-xl font-bold text-gray-800 mb-4'>Amenities</h3>
                        <div className='flex flex-wrap gap-3'>
                            {room.amenities.map((item, i) => (
                                <div key={i} className='bg-white px-4 py-2 rounded-full border shadow-sm flex items-center gap-2'>
                                    <img src={facilityIcons[item] || assets.badgeIcon} className='w-4' alt=""/> {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20">
                        <h3 className="text-2xl font-bold mb-8 text-gray-800 text-center lg:text-left">Guest Experience</h3>
                        <div className="grid gap-6">
                            {reviews.map((rev, index) => (
                                <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
                                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">{rev.username.charAt(0)}</div>
                                    <div>
                                        <p className="font-bold text-gray-800">{rev.username}</p>
                                        <p className="text-yellow-500 text-xs">{"★".repeat(rev.rating)}</p>
                                        <p className="text-gray-600 mt-2 italic">"{rev.comment}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Right Side: Sticky Container --- */}
                <div className='w-full lg:w-[400px] flex flex-col gap-6 lg:sticky lg:top-32'>
                    
                    {/* Booking Form */}
                    <div className='bg-white p-8 rounded-3xl shadow-xl border border-gray-100'>
                        <h2 className='text-xl font-bold mb-6'>Reserve Your Stay</h2>
                        <form onSubmit={handleBooking} className='flex flex-col gap-4'>
                            <input type="date" className='border p-3 rounded-xl outline-none focus:border-blue-500' required onChange={e => setCheckInDate(e.target.value)} />
                            <input type="date" className='border p-3 rounded-xl outline-none focus:border-blue-500' required onChange={e => setCheckOutDate(e.target.value)} />
                            <div className='p-3 border rounded-xl bg-gray-50 text-sm'>
                                <label className='flex items-center gap-2 mb-2 cursor-pointer'><input type="radio" value="Pay At Hotel" checked={paymentMethod === "Pay At Hotel"} onChange={(e) => setPaymentMethod(e.target.value)} /> <span>Pay at Hotel</span></label>
                                <label className='flex items-center gap-2 cursor-pointer'><input type="radio" value="SSLCommerz" checked={paymentMethod === "SSLCommerz"} onChange={(e) => setPaymentMethod(e.target.value)} /> <span>Online Payment</span></label>
                            </div>
                            <button type="submit" disabled={bookingLoading} className='w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all'>Confirm Booking</button>
                        </form>
                    </div>

                    {/* Write a Review Form (Only for Logged in Users) */}
                    {user ? (
                        <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl">
                            <h2 className='text-xl font-bold mb-4'>Write a Review</h2>
                            <form onSubmit={submitReview} className="flex flex-col gap-4">
                                <input className="bg-white/10 p-3 rounded-xl outline-none border border-white/10 focus:border-blue-400" placeholder="Your Display Name" value={reviewerName} onChange={e => setReviewerName(e.target.value)} required />
                                <select className="bg-white/10 p-2.5 rounded-xl border border-white/10 outline-none" value={userRating} onChange={e => setUserRating(e.target.value)}>
                                    {[5,4,3,2,1].map(n => <option key={n} value={n} className='text-black'>{n} Stars</option>)}
                                </select>
                                <textarea className="bg-white/10 p-3 rounded-xl outline-none border border-white/10 focus:border-blue-400" placeholder="How was your stay?" rows="3" value={userComment} onChange={e => setUserComment(e.target.value)} required />
                                <button type="submit" className="bg-white text-gray-900 py-3 rounded-xl font-bold hover:bg-blue-400 hover:text-white transition-all">Post Review</button>
                            </form>
                        </div>
                    ) : (
                        <div className='bg-indigo-50 p-6 rounded-3xl border border-indigo-100 text-center'>
                            <p className='text-indigo-600 text-sm font-medium'>Login to share your experience and post a review!</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default RoomDetails;