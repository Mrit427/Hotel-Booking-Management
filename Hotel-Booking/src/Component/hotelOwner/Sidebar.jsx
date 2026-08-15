import React from 'react'
import { assets } from '../../assets/assets'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    const sidebarLinks=[
        {name:"Dashboard",path:"/owner",icon:assets.dashboardIcon},
        {name:"Add Room",path:"/owner/add-room",icon:assets.addIcon},
        {name:"List Room",path:"/owner/list-room",icon:assets.listIcon},
        

    ]
  return (
   <div className='min-h-screen bg-white border-r border-gray-200'>
      
      <div className='flex flex-col text-gray-600'>
        
        {/* Dashboard Link */}
        <NavLink to='/owner' end className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-black font-bold' : ''}`}>
            <img src={assets.dashboardIcon} alt="" className='w-5' />
            <p className='hidden md:block'>Dashboard</p>
        </NavLink>

        {/* Add Room Link */}
        <NavLink to='/owner/add-room' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-black font-bold' : ''}`}>
            <img src={assets.addIcon} alt="" className='w-5' />
            <p className='hidden md:block'>Add Room</p>
        </NavLink>

        {/* List Room Link */}
        <NavLink to='/owner/list-room' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-black font-bold' : ''}`}>
            <img src={assets.listIcon} alt="" className='w-5' />
            <p className='hidden md:block'>List Room</p>
        </NavLink>

        {/* --- NEW: Add Offer Link --- */}
        <NavLink to='/owner/add-offer' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-black font-bold' : ''}`}>
            <img src={assets.totalBookingIcon} alt="" className='w-5' />
            <p className='hidden md:block'>Add Offer</p>
        </NavLink>

        {/* Reviews Link */}
        <NavLink to='/owner/reviews' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-black font-bold' : ''}`}>
            <img src={assets.badgeIcon} alt="" className='w-5' />
            <p className='hidden md:block'>Reviews & Ratings</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar