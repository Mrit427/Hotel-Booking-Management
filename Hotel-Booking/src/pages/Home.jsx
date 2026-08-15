// import React from 'react'
// import Hero from"../Component/Hero"
// import FeaturedDestination from '../Component/FeaturedDestination'
// import HotelCard from "../Component/HotelCard";
// import ExclusiveOffers from '../Component/ExclusiveOffers';
// import Testimonial from '../Component/Testimonial';
// import NewsLetter from '../Component/NewsLetter';

// const Home = () => {
//   return (
//     <>
//         <Hero/>
//         <FeaturedDestination/>
//         <HotelCard/>
//         <ExclusiveOffers/>
//         <Testimonial/>
//         <NewsLetter/>
//     </>
//   )
// }

// export default Home

import React from 'react'
import Hero from "../Component/Hero"
import FeaturedDestination from '../Component/FeaturedDestination'
import HotelCard from "../Component/HotelCard";
import ExclusiveOffers from '../Component/ExclusiveOffers';
import Testimonial from '../Component/Testimonial';
import NewsLetter from '../Component/NewsLetter';
import HotelReg from '../Component/HotelReg'; // Import the Modal
import { useAppContext } from '../context/AppContext';

const Home = () => {
    const { showHotelReg, setShowHotelReg, user } = useAppContext();

    return (
        <div className='relative'>
            {/* Show Registration Modal if showHotelReg is true */}
            {showHotelReg && <HotelReg />}
            
            <Hero />
            <FeaturedDestination />
            
            {/* --- Hotel Registration Section --- */}
            <div 
    /* 1. Correct way to add a custom CSS gradient in React */
    style={{ 
        background: 'linear-gradient(223deg, rgba(2, 0, 36, 1) 0%, rgba(20, 20, 125, 0.73) 32%, rgba(0, 212, 255, 1) 100%)' 
    }}
    /* 2. Keep your Tailwind classes for layout and design */
    className='py-20 text-center text-white my-20 mx-6 md:mx-16 lg:mx-24 rounded-[3rem] shadow-2xl overflow-hidden relative'
>
    {/* Subtle decorative glow */}
    <div className='absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none'></div>

    <div className='relative z-10'>
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
            Want to grow your business?
        </h2>
        <p className='mt-4 text-lg opacity-90 max-w-2xl mx-auto'>
            Register your hotel now and start reaching thousands of guests.
        </p>
        
        <button 
            /* 3. Logic check: using your existing states */
            onClick={() => user ? setShowHotelReg(true) : alert("Please Login First")}
            className='mt-8 bg-white text-blue-900 px-12 py-3.5 rounded-full font-extrabold hover:scale-105 transition-all shadow-lg active:scale-95'
        >
            Register Your Hotel
        </button>
    </div>
</div>
            <ExclusiveOffers />
            <Testimonial />
            <NewsLetter />
        </div>
    )
}
export default Home;