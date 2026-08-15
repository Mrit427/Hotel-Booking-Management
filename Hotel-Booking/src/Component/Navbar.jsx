// import React, { useEffect, useState } from "react";
// import logo from '../assets/logo1.png';
// import { IoSearch } from "react-icons/io5";
// import {assets} from "../assets/assets"
// import { Link, useLocation } from "react-router-dom";
// import { useClerk ,UserButton} from "@clerk/react";
// import { useAppContext } from "../context/AppContext";


// const BookIcon =()=>(
//       <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
//     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
// </svg>
// )
// const Navbar = () => {
//     const navLinks = [
//         { name: 'Home', path: '/' },
//         { name: 'Hotels', path: '/rooms' },
//         { name: 'Experience', path: '/' },
//         { name: 'About', path: '/' },
//     ];

//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const {openSignIn} = useClerk()
//     // const {user} = useUser()
//     // const navigate = useNavigate()  
//     const location = useLocation()

//     const {user,navigate, isOwner ,setShowHotelReg} = useAppContext()

//     console.log(user);
    
//     useEffect(() => {

// if(location.pathname !== '/'){
//     setIsScrolled (true);
//     return;
// }else{ 
//     setIsScrolled(false)
// }
// setIsScrolled(prev=> location.pathname !== '/' ? true : prev);

//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 10);
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [location.pathname]);

//     return (
//         <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

//             {/* Logo */}
//             <Link to='/'>
//                 <img src={assets.logo} alt="logo" className={`h-12 ${isScrolled && "invert opacity-80"}`} />

//             </Link>

//             {/* Desktop Nav */}
//             <div className="hidden md:flex items-center gap-4 lg:gap-8">
//                 {navLinks.map((link, i) => (
//                     <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
//                         {link.name}
//                         <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
//                     </a>
//                 ))}
//              {user && (
//                 <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${ isScrolled ? 'text-black' : 'text-white'} transition-all`} onClick={()=> isOwner ? navigate('/owner') : setShowHotelReg(true)}  >
//                    {isOwner ? 'Dashboard' : 'List Your Hotel'}
//                 </button>
//              )
//                 }
//             </div>

//             {/* Desktop Right */}
//             <div className="hidden md:flex items-center gap-4">
//                 <img src={assets.searchIcon} alt="" className={`${isScrolled && "invert"} h-7 transition-all duration-500 `} />

// {user ? 
// (<UserButton>
//     <UserButton.MenuItems>
//         <UserButton.Action
//          label="My Bookings" 
//          labelIcon={<BookIcon/>}  
//          onClick={()=> navigate ('/my-bookings')}
//          />
//     </UserButton.MenuItems>
// </UserButton>)
// :
// (<button onClick={openSignIn} className= "bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
//                     Login
//                 </button>)
// }

                
//             </div>

//             {/* Mobile Menu Button */}

 
//             <div className="flex items-center gap-3 md:hidden">
// {user && <UserButton>
//     <UserButton.MenuItems>
//         <UserButton.Action
//          label="My Bookings" 
//          labelIcon={<BookIcon/>}  
//          onClick={()=> navigate ('/my-bookings')}
//          />
//     </UserButton.MenuItems>
// </UserButton>}
//                 <img onClick={()=>setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="" 
//                 className={`${isScrolled && "invert"} h-4`} />
//             </div>

//             {/* Mobile Menu */}
//             <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
//                 <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
//                     <img src={assets.closeIcon} alt="close-menu" className="h-6.5" />
//                 </button>

//                 {navLinks.map((link, i) => (
//                     <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
//                         {link.name}
//                     </a>
//                 ))}

//                {user  && <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"  onClick={()=> isOwner ? navigate('/owner') : setShowHotelReg(true)}  >
//                    {isOwner ? 'Dashboard' : 'List Your Hotel'}
//                 </button>}

//                {!user && <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
//                     Login
//                 </button>}
//             </div>
//         </nav>

//     );
// }

// export default Navbar



// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserButton, useClerk } from "@clerk/clerk-react"; // Ensure this matches Step 1
// import { useAppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";

// const Navbar = () => {
//     const { user, isOwner } = useAppContext();
//     const navigate = useNavigate();
//     const { openSignIn } = useClerk();

//     return (
//         <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-white shadow-md z-50">
//             <Link to='/'>
//                 <img src={assets.logo} alt="logo" className="h-10" />
//             </Link>

//             <div className="flex items-center gap-8">
//                 <Link to="/" className="text-gray-700">Home</Link>
//                 <Link to="/rooms" className="text-gray-700">Hotels</Link>

//                 {/* This button only shows for mrittikamazumder72@gmail.com */}
//                 {user && isOwner && (
//                     <button 
//                         onClick={() => navigate('/owner')} 
//                         className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm"
//                     >
//                         Admin Dashboard
//                     </button>
//                 )}

//                 {user ? (
//                     <UserButton afterSignOutUrl="/" />
//                 ) : (
//                     <button onClick={() => openSignIn()} className="bg-black text-white px-8 py-2 rounded-full">
//                         Login
//                     </button>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// // CRITICAL: Import from @clerk/clerk-react
// import { useClerk, UserButton } from "@clerk/clerk-react"; 
// import { useAppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";

// const BookIcon = () => (
//     <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
//     </svg>
// );

// const Navbar = () => {
//     const navLinks = [
//         { name: 'Home', path: '/' },
//         { name: 'Hotels', path: '/rooms' },
//         { name: 'Experience', path: '/' },
//         { name: 'About', path: '/' },
//     ];

//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
    
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { openSignIn } = useClerk();
//     const { user, isOwner } = useAppContext();

//     // Scroll and Path logic for Transparent vs White Navbar
//     useEffect(() => {
//         if (location.pathname !== '/') {
//             setIsScrolled(true);
//         } else {
//             setIsScrolled(window.scrollY > 10);
//         }

//         const handleScroll = () => {
//             if (location.pathname === '/') {
//                 setIsScrolled(window.scrollY > 10);
//             }
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [location.pathname]);

//     return (
//         <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6 text-white"}`}>

//             {/* Logo */}
//             <Link to='/'>
//                 <img src={assets.logo} alt="logo" className={`h-12 ${isScrolled && "invert opacity-80"}`} />
//             </Link>

//             {/* Desktop Nav */}
//             <div className="hidden md:flex items-center gap-4 lg:gap-8">
//                 {navLinks.map((link, i) => (
//                     <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
//                         {link.name}
//                         <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
//                     </Link>
//                 ))}

//                 {/* Dashboard button only for mrittikamazumder72@gmail.com */}
//                 {user && isOwner && (
//                     <button 
//                         className={`border px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer transition-all ${isScrolled ? 'border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'}`} 
//                         onClick={() => navigate('/owner')}
//                     >
//                         Admin Dashboard
//                     </button>
//                 )}
//             </div>

//             {/* Desktop Right */}
//             <div className="hidden md:flex items-center gap-4">
//                 <img src={assets.searchIcon} alt="search" className={`${isScrolled && "invert"} h-7 transition-all duration-500 cursor-pointer`} />

//                 {user ? (
//                     <UserButton afterSignOutUrl="/">
//                         <UserButton.MenuItems>
//                             <UserButton.Action
//                                 label="My Bookings"
//                                 labelIcon={<BookIcon />}
//                                 onClick={() => navigate('/my-bookings')}
//                             />
//                         </UserButton.MenuItems>
//                     </UserButton>
//                 ) : (
//                     <button 
//                         onClick={() => openSignIn()} 
//                         className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 hover:bg-gray-800"
//                     >
//                         Login
//                     </button>
//                 )}
//             </div>

//             {/* Mobile Menu Toggle */}
//             <div className="flex items-center gap-3 md:hidden">
//                 {user && <UserButton afterSignOutUrl="/" />}
//                 <img 
//                     onClick={() => setIsMenuOpen(!isMenuOpen)} 
//                     src={assets.menuIcon} 
//                     alt="menu" 
//                     className={`${isScrolled && "invert"} h-6 cursor-pointer`} 
//                 />
//             </div>

//             {/* Mobile Menu Overlay */}
//             <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
//                 <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
//                     <img src={assets.closeIcon} alt="close" className="h-8" />
//                 </button>

//                 {navLinks.map((link, i) => (
//                     <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-xl">
//                         {link.name}
//                     </Link>
//                 ))}

//                 {user && isOwner && (
//                     <button 
//                         className="bg-indigo-600 text-white px-6 py-2 rounded-full text-lg" 
//                         onClick={() => { navigate('/owner'); setIsMenuOpen(false); }}
//                     >
//                         Admin Dashboard
//                     </button>
//                 )}

//                 {!user && (
//                     <button 
//                         onClick={() => { openSignIn(); setIsMenuOpen(false); }} 
//                         className="bg-black text-white px-10 py-3 rounded-full text-lg"
//                     >
//                         Login
//                     </button>
//                 )}
//             </div>
//         </nav>
//     );
// }

// export default Navbar;



// ----ai
// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useClerk, UserButton } from "@clerk/clerk-react"; 
// import { useAppContext } from "../context/AppContext"; // Import the hook
// import { assets } from "../assets/assets";

// const BookIcon = () => (
//     <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
//     </svg>
// );

// const Navbar = () => {
//     const navLinks = [
//         { name: 'Home', path: '/' },
//         { name: 'Hotels', path: '/rooms' },
//         { name: 'Experience', path: '/' },
//         { name: 'About', path: '/' },
//     ];

//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
    
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { openSignIn } = useClerk();
//     const { user, isOwner } = useAppContext(); // Use the hook here

//     useEffect(() => {
//         const handleScroll = () => {
//             if (location.pathname === '/') {
//                 setIsScrolled(window.scrollY > 10);
//             } else {
//                 setIsScrolled(true);
//             }
//         };
//         handleScroll();
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [location.pathname]);

//     return (
//         <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6 text-white"}`}>
//             <Link to='/'>
//                 <img src={assets.logo} alt="logo" className={`h-12 ${isScrolled && "invert opacity-80"}`} />
//             </Link>

//             <div className="hidden md:flex items-center gap-4 lg:gap-8">
//                 {navLinks.map((link, i) => (
//                     <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
//                         {link.name}
//                         <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
//                     </Link>
//                 ))}

//                 {/* The Dashboard button */}
//                 {user && isOwner && (
//                     <button 
//                         onClick={() => navigate('/owner')} 
//                         className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isScrolled ? "bg-indigo-600 text-white" : "border border-white text-white hover:bg-white hover:text-black"}`}
//                     >
//                         Admin Dashboard
//                     </button>
//                 )}
//             </div>

//             <div className="hidden md:flex items-center gap-4">
//                 <img src={assets.searchIcon} alt="search" className={`${isScrolled && "invert"} h-7 cursor-pointer`} />
//                 {user ? (
//                     <UserButton afterSignOutUrl="/">
//                         <UserButton.MenuItems>
//                             <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
//                         </UserButton.MenuItems>
//                     </UserButton>
//                 ) : (
//                     <button onClick={() => openSignIn()} className="bg-black text-white px-8 py-2.5 rounded-full ml-4">Login</button>
//                 )}
//             </div>

//             {/* Mobile Menu */}
//             <div className="md:hidden flex items-center gap-3">
//                 {user && <UserButton afterSignOutUrl="/" />}
//                 <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="menu" className={`${isScrolled && "invert"} h-6 cursor-pointer`} />
//             </div>
            
//             {/* Mobile menu expanded code... same as before */}
//         </nav>
//     );
// }

// export default Navbar;
// __________________________________________________

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/clerk-react"; 
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Navbar = () => {
    const { user, isOwner } = useAppContext();
    const { openSignIn } = useClerk(); // Clerk-এর পপআপ ফাংশন
    const navigate = useNavigate();
    const location = useLocation();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (location.pathname === '/') {
                setIsScrolled(window.scrollY > 10);
            } else {
                setIsScrolled(true);
            }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white shadow-md py-4 text-gray-800" : "bg-transparent py-6 text-white"}`}>
            
            <Link to='/'><img src={assets.logo} alt="logo" className={`h-10 ${isScrolled && "invert"}`} /></Link>

            <div className="hidden md:flex items-center gap-8 font-medium">
                <Link to="/">Home</Link>
                <Link to="/rooms">Hotels</Link>

                {/* Dashboard Button: Only shows if user is logged in and is an owner */}
                {user && isOwner && (
                    <button 
                        onClick={() => navigate('/owner')} 
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${isScrolled ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"}`}
                    >
                        Admin Dashboard
                    </button>
                )}
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <UserButton afterSignOutUrl="/" />
                ) : (
                    <button 
                        onClick={() => openSignIn()} // এটিই লগইন পপআপ ওপেন করবে
                        className="bg-black text-white px-8 py-2.5 rounded-full hover:bg-gray-800 transition-all"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;