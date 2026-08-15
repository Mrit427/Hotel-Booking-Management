import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from "../assets/assets"

const cities = ["Sundarbans", "Cox's Bazar", "Sajek", "Sylhet", "Bandarban", "Chittagong", "Dhaka"];

const Hero = () => {
  const navigate = useNavigate();

  // --- Search Form States ---
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  // --- Slider Data ---
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
      title: "Discover Your Perfect Gateway Destination",
      subtitle: "Unparalleled luxury and comfort await at the world's most exclusive hotels."
    },
    {
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080",
      title: "Experience the Serenity of Nature",
      subtitle: "Find peace in our handpicked eco-resorts nestled in deep green forests."
    },
    {
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070",
      title: "Luxury Beachfront Living",
      subtitle: "Wake up to the sound of waves in our premium beachfront suites."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Automatic Slider Logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // Slightly longer duration for cinematic feel
    return () => clearInterval(interval);
  }, [slides.length]);

  // --- Search Logic ---
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/rooms?city=${destination}&guests=${guests}&checkIn=${checkIn}&checkOut=${checkOut}`
    );
  };

  return (
    <div className='relative w-full h-screen overflow-hidden flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white'>
      
      {/* --- Enhanced Background Slider --- */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-[-2] transition-all duration-[2000ms] ease-in-out ${
            index === currentIndex ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <img 
            src={slide.image} 
            alt="background" 
            className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-linear ${
                index === currentIndex ? "scale-100 translate-x-0" : "scale-125 translate-x-10"
            }`} 
          />
          {/* Advanced Gradient Overlay for better depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      ))}

      {/* --- Animated Text Content --- */}
      <div key={currentIndex} className='animate-heroText pointer-events-none'>
        <p className='bg-blue-500/30 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full w-fit text-sm mb-4 tracking-widest uppercase'>
          The Ultimate Hotel Experience
        </p>

        <h1 className='font-playfair text-4xl md:text-6xl lg:text-[70px] lg:leading-[75px] font-bold max-w-3xl drop-shadow-2xl'>
          {slides[currentIndex].title}
        </h1>

        <p className='max-w-xl mt-6 text-sm md:text-xl opacity-90 font-light leading-relaxed drop-shadow-lg'>
          {slides[currentIndex].subtitle}
        </p>
      </div>

      {/* --- Glassmorphism Search Form --- */}
      <form 
        onSubmit={handleSearch}
        className='bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl px-8 py-6 mt-12 flex flex-col md:flex-row items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-5xl'
      >
        {/* Destination Dropdown */}
        <div className='w-full md:w-auto flex-1'>
          <div className='flex items-center gap-2 mb-2'>
            <img src={assets.calenderIcon} alt="" className='h-4 invert opacity-70'/>
            <label className='text-xs font-semibold opacity-70 uppercase tracking-tighter'>Destination</label>
          </div>
          <input 
            list='destinations'
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="bg-transparent border-b border-white/30 py-2 w-full outline-none text-white placeholder:text-white/50 text-lg font-medium"
            placeholder="Where to?"
            required
          />
          <datalist id='destinations'>
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check In */}
        <div className='w-full md:w-auto border-l-0 md:border-l border-white/20 md:pl-8'>
          <div className='flex items-center gap-2 mb-2'>
            <img src={assets.calenderIcon} alt="" className='h-4 invert opacity-70'/>
            <label className='text-xs font-semibold opacity-70 uppercase tracking-tighter'>Check in</label>
          </div>
          <input 
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="bg-transparent outline-none text-white text-lg font-medium [color-scheme:dark]"
          />
        </div>

        {/* Check Out */}
        <div className='w-full md:w-auto border-l-0 md:border-l border-white/20 md:pl-8'>
          <div className='flex items-center gap-2 mb-2'>
            <img src={assets.calenderIcon} alt="" className='h-4 invert opacity-70'/>
            <label className='text-xs font-semibold opacity-70 uppercase tracking-tighter'>Check out</label>
          </div>
          <input 
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="bg-transparent outline-none text-white text-lg font-medium [color-scheme:dark]"
          />
        </div>

        {/* Guests */}
        <div className='w-full md:w-auto border-l-0 md:border-l border-white/20 md:pl-8'>
          <div className='flex items-center gap-2 mb-2'>
            <label className='text-xs font-semibold opacity-70 uppercase tracking-tighter'>Guests</label>
          </div>
          <input 
            min={1}
            max={4}
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="bg-transparent outline-none text-white w-full md:w-12 text-lg font-medium"
            placeholder="1"
          />
        </div>

        {/* Search Button */}
        <button 
          type="submit"
          className='bg-white text-black px-10 py-4 rounded-xl flex items-center gap-3 hover:bg-indigo-600 hover:text-white transition-all duration-300 w-full md:w-auto justify-center shadow-lg active:scale-95 group'
        >
          <img src={assets.searchIcon} alt="" className='h-5 group-hover:invert transition-all'/>
          <span className='font-bold uppercase text-sm'>Search</span>
        </button>
      </form>

      {/* --- Cinematic Slider Indicators --- */}
      <div className='absolute bottom-12 left-6 md:left-16 lg:left-24 flex items-center gap-4'>
        {slides.map((_, i) => (
          <div 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className='group cursor-pointer py-4'
          >
              <div className={`h-[3px] rounded-full transition-all duration-500 ${i === currentIndex ? "w-16 bg-blue-400" : "w-8 bg-white/20 group-hover:bg-white/50"}`}></div>
          </div>
        ))}
      </div>

      {/* Custom Keyframe Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroTextSlide {
          0% { transform: translateX(-50px); opacity: 0; filter: blur(10px); }
          100% { transform: translateX(0); opacity: 1; filter: blur(0); }
        }
        .animate-heroText {
          animation: heroTextSlide 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
        }
      `}} />
    </div>
  )
}

export default Hero