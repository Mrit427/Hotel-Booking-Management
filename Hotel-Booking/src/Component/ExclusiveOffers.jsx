import React from 'react'
import { useAppContext } from '../context/AppContext'
import Tittle from './Tittle' // Using the spelling 'Tittle' as per your project
import { assets } from '../assets/assets'

const ExclusiveOffers = () => {
    // Getting live offers array from global context
    const { offers } = useAppContext();

    return (
        <div className='py-20 px-6 md:px-16 lg:px-24 xl:px-32 bg-white'>
            {/* Header Section */}
            <div className='flex justify-between items-end mb-12'>
                <Tittle 
                    align='left' 
                    tittle='Exclusive Offers' 
                    subTittle='Take advantage of our limited-time live deals and special holiday packages.' 
                />
            </div>

            {/* Offers Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {offers && offers.length > 0 ? (
                    // Mapping through live offers from MongoDB
                    offers.slice(0, 3).map((item, index) => (
                        <div 
                            key={item._id || index} 
                            className='group relative flex flex-col justify-end p-8 h-80 rounded-[2rem] text-white bg-cover bg-center overflow-hidden shadow-lg hover:h-90 transition-all duration-500'
                            style={{ backgroundImage: `url(${item.image})` }}
                        >
                            {/* Dark gradient overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all"></div>
                            
                            <div className='relative z-10'>
                                {/* Discount Badge */}
                                <span className='bg-white text-indigo-600 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase shadow-sm'>
                                    {item.priceOff}% OFF
                                </span>

                                {/* Offer Content */}
                                <h3 className='text-2xl font-bold mt-4 font-playfair tracking-tight'>{item.title}</h3>
                                <p className='text-sm opacity-80 mt-2 line-clamp-2 leading-relaxed'>
                                    {item.description}
                                </p>
                                
                                {/* Expiry Info */}
                                <div className='flex items-center gap-2 mt-4 text-[11px] font-bold text-indigo-300 uppercase tracking-widest'>
                                    <span className='w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse'></span>
                                    Expires {item.expiryDate}
                                </div>

                                {/* Action Button */}
                                {/* <button className='mt-6 flex items-center gap-2 text-sm font-bold border-b-2 border-transparent hover:border-white transition-all duration-300 w-fit'>
                                    View Offers 
                                    <img src={assets.arrowIcon} className='w-4 invert' alt="arrow" />
                                </button> */}
                            </div>
                        </div>
                    ))
                ) : (
                    // Placeholder shown if database has 0 offers
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                        <img src={assets.logo} className="w-12 mx-auto opacity-10 grayscale mb-4" alt="" />
                        <p className="text-gray-400 text-lg font-medium">No live offers available right now.</p>
                        <p className="text-gray-400 text-sm mt-1">Please check back later for exclusive deals!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ExclusiveOffers;