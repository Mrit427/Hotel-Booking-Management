// import React from 'react'
// import { assets, cities } from '../assets/assets'

// const HotelReg = () => {
//   return (
//     <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
//         <form className='flex bg-white rounded-2xl max-w-4xl max-md:mx-2'>
//             <img src={assets.regImage} alt="reg-image" className='w-1/2 rounded-xl hidden md:block' />
//             <div className='relative flex flex-col'>
//                 <img src={assets.closeIcon} alt="close-icon" className='absolute top-4 right-4 h-4 w-4 cursor-pointer' />
//                 <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>

//                 {/* Hotel Name */}
//                 <div className='w-full mt-4'>
//                   <label htmlFor="name" className='font-medium text-gray-500'>
//                     Hotel Name
//                   </label>
//                   <input type="text" placeholder='Type Here ' className='border border-gray-200 
//                   rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
//                 </div>
//                 {/* Phone */}
//                 <div className='w-full mt-4'>
//                   <label htmlFor="contact" className='font-medium text-gray-500'>
//                     Phone
//                   </label>
//                   <input id='contact' type="text" placeholder='Type Here ' className='border border-gray-200 
//                   rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
//                 </div>
//                 {/* Address */}
//                 <div className='w-full mt-4'>
//                   <label htmlFor="address" className='font-medium text-gray-500'>
//                     Address
//                   </label>
//                   <input id='address' type="text" placeholder='Type Here ' className='border border-gray-200 
//                   rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
//                 </div>
//                 {/*Select City Drop down*/}
//                 <div className='w-full mt-4 max-w-60 mr-auto'>
//                   <label htmlFor="city" className='font-medium text-gray-500'>
//                     City
//                   </label>
//                   <select id="city" className='border border-gray-200 
//                   rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required>
//                     <option value="">Select City</option>
//                     {cities.map((city)=>(
//                       <option key={city} value={city}>{city}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <button className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white 
//                 mr-auto px-6 py-2 rounded cursor-pointer mt-6'>
//                   Register
//                 </button>
//             </div>
//         </form>
        
//     </div>
//   )
// }

// export default HotelReg
import React from 'react'
import { assets, cities } from '../../assets/assets'

const HotelReg = () => {
  return (
    // ব্যাকগ্রাউন্ড ওভারলে
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'>
        
        {/* মেইন ফর্ম কন্টেইনার - একটি নির্দিষ্ট হাইট দেওয়া হয়েছে যাতে ইমেজ জায়গা পায় */}
        <form className='flex bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl h-[550px]'>
            
            {/* বামদিকের ইমেজ: md:flex ব্যবহার করা হয়েছে যাতে বড় স্ক্রিনে এটি অর্ধেক জায়গা নেয় */}
            <div className='hidden md:flex w-1/2 bg-gray-100 items-center justify-center overflow-hidden'>
                <img 
                    src={assets.regImage} 
                    alt="Register Hotel" 
                    className='w-full h-full object-cover' 
                    // যদি ইমেজ তাও না আসে, তবে আপনার assets.js ফাইলে regImage এর পাথ চেক করুন।
                />
            </div>

            {/* ডানদিকের ফর্ম সেকশন */}
            <div className='relative flex flex-col w-full md:w-1/2 p-10 overflow-y-auto'>
                
                {/* ক্লোজ আইকন */}
                <img 
                    src={assets.closeIcon} 
                    alt="Close" 
                    className='absolute top-6 right-6 h-4 w-4 cursor-pointer hover:scale-110 transition-transform' 
                />
                
                <h2 className='text-2xl font-bold text-gray-800 mb-6'>Register Your Hotel</h2>

                <div className='flex flex-col gap-4'>
                    {/* Hotel Name */}
                    <div>
                        <label className='block font-medium text-gray-600 mb-1'>Hotel Name</label>
                        <input type="text" placeholder='Type Here' className='border border-gray-200 rounded-lg w-full px-4 py-2.5 outline-indigo-500 font-light' required />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className='block font-medium text-gray-600 mb-1'>Phone</label>
                        <input type="text" placeholder='Type Here' className='border border-gray-200 rounded-lg w-full px-4 py-2.5 outline-indigo-500 font-light' required />
                    </div>

                    {/* Address */}
                    <div>
                        <label className='block font-medium text-gray-600 mb-1'>Address</label>
                        <input type="text" placeholder='Type Here' className='border border-gray-300 rounded-lg w-full px-4 py-2.5 outline-indigo-500 font-light' required />
                    </div>

                    {/* City Dropdown */}
                    <div>
                        <label className='block font-medium text-gray-600 mb-1'>City</label>
                        <select className='border border-gray-200 rounded-lg w-full px-4 py-2.5 outline-indigo-500 bg-white font-light' required>
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className='bg-indigo-600 hover:bg-indigo-700 transition-all text-white w-full py-3 rounded-lg font-semibold mt-4 shadow-lg shadow-indigo-100'>
                        Register Now
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default HotelReg