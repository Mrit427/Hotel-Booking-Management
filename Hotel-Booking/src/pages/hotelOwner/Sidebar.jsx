<NavLink to='/owner/reviews' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
    <img src={assets.badgeIcon} alt="" className='w-5' />
    <p className='hidden md:block'>Reviews & Ratings</p>
</NavLink>