import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from "../assets/assets"
import { motion } from 'framer-motion' // CRITICAL: Added this import

const HotelCard = ({ room, index }) => {
    if (!room) return null;

    return (
        <motion.div
            // Animation: Card lifts up on hover
            whileHover={{ y: -10 }} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Link
                to={`/rooms/${room._id}`}
                onClick={() => window.scrollTo(0, 0)}
                className="block relative max-w-70 w-full rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow group"
            >
                {/* Badge: Shows "Best Seller" for every even index item */}
                {index % 2 === 0 && (
                    <p className='z-20 px-3 py-1 absolute top-3 left-3 text-[10px] bg-white text-gray-800 font-bold uppercase rounded-full shadow-sm'>
                        Best Seller
                    </p>
                )}

                {/* Image Section */}
                <div className='overflow-hidden h-48 relative'>
                    <motion.img 
                        // Animation: Image zooms slightly when hovering anywhere on the card
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={room.images[0]} 
                        alt={room.hotelName}
                        className="w-full h-full object-cover" 
                    />
                </div>
                
                {/* Content Section */}
                <div className='p-4'>
                    <div className='flex items-center justify-between'>
                        <h3 className='font-bold text-lg text-gray-800 truncate mr-2'>
                            {room.hotelName}
                        </h3>
                        <div className='flex items-center gap-1 text-xs bg-yellow-50 px-2 py-0.5 rounded border border-yellow-100 text-yellow-700 font-bold'>
                            <img src={assets.starIconFilled} className="w-2.5" alt="" /> 4.5
                        </div>
                    </div>

                    <p className='text-gray-500 text-xs mt-1 uppercase tracking-wider font-medium'>
                        {room.roomType}
                    </p>

                    <div className='flex items-center justify-between mt-5 border-t pt-3'>
                        <div>
                            <p className='text-xs text-gray-400'>Starting from</p>
                            <p className='font-bold text-blue-600 text-xl'>
                                ৳{room.pricePerNight}
                                <span className='text-[10px] text-gray-400 font-normal'> /night</span>
                            </p>
                        </div>
                        
                        <button className='text-xs font-bold border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300'>
                            View Details
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default HotelCard;