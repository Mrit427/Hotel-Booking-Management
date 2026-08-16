
// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { facilityIcons, assets } from '../assets/assets';
// // import StarRating from '../Component/StarRating';


// // const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
// //   return (
// //     <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
// //       <input
// //         type="checkbox"
// //         checked={selected}
// //         onChange={(e) => onChange(e.target.checked, label)}
// //       />
// //       <span className="font-light select-none">{label}</span>
// //     </label>
// //   );
// // };


// // const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
// //   return (
// //     <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
// //       <input
// //         type="radio"
// //         name="sortOption"
// //         checked={selected}
// //         onChange={() => onChange(label)}
// //       />
// //       <span className="font-light select-none">{label}</span>
// //     </label>
// //   );
// // };



// // const AllRooms = () => {

// //   const navigate = useNavigate();

// //   const [openFilters, setOpenFilters] = useState(false);


// //   // MongoDB rooms
// //   const [rooms, setRooms] = useState([]);


// //   // Filter states
// //   const [selectedTypes, setSelectedTypes] = useState([]);
// //   const [selectedPrices, setSelectedPrices] = useState([]);
// //   const [sortBy, setSortBy] = useState("");



// //   // Get rooms from backend
// //   useEffect(() => {

// //     fetch("http://localhost:5000/api/rooms")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setRooms(data.rooms || []);
// //       })
// //       .catch((error) => {
// //         console.log("Room fetching error:", error);
// //       });

// //   }, []);



// //   const roomTypes = [
// //     'Single Bed',
// //     'Double Bed',
// //     'Luxury Room',
// //     'Family Suite',
// //   ];


// //   const priceRanges = [
// //     '0 to 500',
// //     '500 to 1000',
// //     '1000 to 2000',
// //     '2000 to 3000',
// //   ];


// //   const sortOptions = [
// //     'Price low to High',
// //     'Price High to low',
// //     'Newest First',
// //   ];



// //   // Filter + Sort Logic

// //   const filteredRooms = rooms
// //     .filter((room) => {


// //       const typeMatch =
// //         selectedTypes.length === 0 ||
// //         selectedTypes.includes(room.roomType);



// //       const priceMatch =
// //         selectedPrices.length === 0 ||
// //         selectedPrices.some((range) => {


// //           const price = room.pricePerNight;


// //           if (range === "0 to 500")
// //             return price <= 500;


// //           if (range === "500 to 1000")
// //             return price > 500 && price <= 1000;


// //           if (range === "1000 to 2000")
// //             return price > 1000 && price <= 2000;


// //           if (range === "2000 to 3000")
// //             return price > 2000 && price <= 3000;


// //           return false;

// //         });



// //       return typeMatch && priceMatch;


// //     })


// //     .sort((a,b)=>{


// //       if(sortBy === "Price low to High")
// //         return a.pricePerNight - b.pricePerNight;


// //       if(sortBy === "Price High to low")
// //         return b.pricePerNight - a.pricePerNight;


// //       if(sortBy === "Newest First")
// //         return new Date(b.createdAt) - new Date(a.createdAt);


// //       return 0;

// //     });
// // return (
// //     <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">


// //       {/* Rooms Section */}
// //       <div className="flex-1">


// //         <div className="flex flex-col items-start text-left">

// //           <h1 className="font-playfair text-4xl md:text-[40px]">
// //             Hotel Rooms
// //           </h1>

// //           <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
// //             Take advantage of our limited-time offers and special packages to
// //             enhance your stay and create unforgettable memories.
// //           </p>

// //         </div>



// //         {filteredRooms.length === 0 ? (

// //           <p className="mt-10 text-gray-500">
// //             No rooms found.
// //           </p>

// //         ) : (


// //         filteredRooms.map((room)=>(

// //           <div
// //             key={room._id}
// //             className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
// //           >


// //             <img
// //               onClick={()=>{
// //                 navigate(`/rooms/${room._id}`);
// //                 scrollTo(0,0);
// //               }}

// //               src={room.images?.[0]}
// //               alt="hotel-img"
// //               className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
// //             />



// //             <div className="md:w-1/2 flex flex-col gap-2">


// //               <p className="text-gray-500">
// //                 {room.hotel?.city}
// //               </p>



// //               <p
// //                 onClick={()=>{
// //                   navigate(`/rooms/${room._id}`);
// //                   scrollTo(0,0);
// //                 }}

// //                 className="text-gray-800 text-3xl font-playfair cursor-pointer"
// //               >

// //                 {room.hotel?.name}

// //               </p>



// //               <div className="flex items-center">

// //                 <StarRating />

// //                 <p className="ml-2">
// //                   200+ Reviews
// //                 </p>

// //               </div>




// //               <div className="flex items-center gap-1">

// //                 <img
// //                   src={assets.locationIcon}
// //                   alt="location-icon"
// //                 />

// //                 <span>
// //                   {room.hotel?.address}
// //                 </span>

// //               </div>




// //               <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">


// //                 {room.amenities?.map((item,index)=>(


// //                   <div
// //                     key={index}
// //                     className="flex items-center gap-2 px-2 py-2 rounded-lg bg-[#f5F5FF]/70"
// //                   >

// //                     <img
// //                       src={facilityIcons[item] || assets.badgeIcon}
// //                       alt={item}
// //                       className="w-5 h-5"
// //                     />

// //                   </div>


// //                 ))}


// //               </div>




// //               <p className="text-xl font-medium text-gray-700">

// //                 ${room.pricePerNight} /night

// //               </p>



// //             </div>


// //           </div>


// //         ))

// //         )}



// //       </div>





// //       {/* Filters */}

// //       <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">


// //         <div
// //           className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
// //             openFilters ? 'border-b' : ''
// //           }`}
// //         >


// //           <p className="text-base font-medium text-gray-800">
// //             FILTERS
// //           </p>



// //           <span
// //             onClick={()=>{

// //               setSelectedTypes([]);
// //               setSelectedPrices([]);
// //               setSortBy("");

// //             }}

// //             className="hidden lg:block text-xs cursor-pointer"
// //           >

// //             CLEAR

// //           </span>



// //           <span
// //             onClick={()=>setOpenFilters(!openFilters)}
// //             className="lg:hidden text-xs cursor-pointer"
// //           >

// //             {openFilters ? "HIDE":"SHOW"}

// //           </span>



// //         </div>






// //         <div
// //           className={`${
// //             openFilters ? 'h-auto':'h-0 lg:h-auto'
// //           } overflow-hidden transition-all duration-700`}
// //         >



// //           {/* Room Type */}

// //           <div className="px-5 pt-5">


// //             <p className="font-medium text-gray-800 pb-2">
// //               Popular Filters
// //             </p>



// //             {roomTypes.map((type,index)=>(


// //               <CheckBox

// //                 key={index}

// //                 label={type}

// //                 selected={selectedTypes.includes(type)}

// //                 onChange={(checked)=>{


// //                   if(checked){

// //                     setSelectedTypes([
// //                       ...selectedTypes,
// //                       type
// //                     ]);

// //                   }

// //                   else{

// //                     setSelectedTypes(
// //                       selectedTypes.filter(
// //                         item=>item!==type
// //                       )
// //                     );

// //                   }


// //                 }}

// //               />


// //             ))}



// //           </div>







// //           {/* Price */}

// //           <div className="px-5 pt-5">


// //             <p className="font-medium text-gray-800 pb-2">
// //               Price Range
// //             </p>



// //             {priceRanges.map((range,index)=>(


// //               <CheckBox

// //                 key={index}

// //                 label={`$ ${range}`}

// //                 selected={selectedPrices.includes(range)}

// //                 onChange={(checked)=>{


// //                   if(checked){

// //                     setSelectedPrices([
// //                       ...selectedPrices,
// //                       range
// //                     ]);

// //                   }

// //                   else{

// //                     setSelectedPrices(
// //                       selectedPrices.filter(
// //                         item=>item!==range
// //                       )
// //                     );

// //                   }


// //                 }}


// //               />


// //             ))}



// //           </div>







// //           {/* Sort */}

// //           <div className="px-5 pt-5 pb-7">


// //             <p className="font-medium text-gray-800 pb-2">
// //               Sort By
// //             </p>



// //             {sortOptions.map((option,index)=>(


// //               <RadioButton

// //                 key={index}

// //                 label={option}

// //                 selected={sortBy===option}

// //                 onChange={(value)=>setSortBy(value)}

// //               />


// //             ))}



// //           </div>



// //         </div>



// //       </div>



// //     </div>
// // );


// // };

// // export default AllRooms;
// // --------------------------------new-------------------------
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { facilityIcons, assets } from '../assets/assets';
// import StarRating from '../Component/StarRating';


// const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
//   return (
//     <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
//       <input
//         type="checkbox"
//         checked={selected}
//         onChange={(e) => onChange(e.target.checked, label)}
//       />
//       <span className="font-light select-none">{label}</span>
//     </label>
//   );
// };


// const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
//   return (
//     <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
//       <input
//         type="radio"
//         name="sortOption"
//         checked={selected}
//         onChange={() => onChange(label)}
//       />
//       <span className="font-light select-none">{label}</span>
//     </label>
//   );
// };



// const AllRooms = () => {

//   const navigate = useNavigate();

//   const [searchParams] = useSearchParams();


//   // Data from Hero search
//   const searchCity = searchParams.get("city");
//   const searchGuests = searchParams.get("guests");
//   const checkIn = searchParams.get("checkIn");
//   const checkOut = searchParams.get("checkOut");



//   const [openFilters, setOpenFilters] = useState(false);


//   // MongoDB rooms
//   const [rooms, setRooms] = useState([]);


//   // Filter states
//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const [selectedPrices, setSelectedPrices] = useState([]);
//   const [sortBy, setSortBy] = useState("");



//   // Get rooms from backend
//   useEffect(() => {

//     fetch("http://localhost:5000/api/rooms")
//       .then((res) => res.json())
//       .then((data) => {

//         setRooms(data.rooms || []);

//       })
//       .catch((error) => {

//         console.log("Room fetching error:", error);

//       });

//   }, []);




//   const roomTypes = [
//     'Single Bed',
//     'Double Bed',
//     'Luxury Room',
//     'Family Suite',
//   ];



//   const priceRanges = [
//     '0 to 500',
//     '500 to 1000',
//     '1000 to 2000',
//     '2000 to 3000',
//   ];



//   const sortOptions = [
//     'Price low to High',
//     'Price High to low',
//     'Newest First',
//   ];





//   // Search + Filter + Sort Logic

//   const filteredRooms = rooms

//     .filter((room)=>{


//       // Destination filter from Hero search

//       const cityMatch =
//         !searchCity ||
//         room.hotel?.city?.toLowerCase() === searchCity.toLowerCase();



//       // Room type filter

//       const typeMatch =
//         selectedTypes.length === 0 ||
//         selectedTypes.includes(room.roomType);




//       // Price filter

//       const priceMatch =
//         selectedPrices.length === 0 ||
//         selectedPrices.some((range)=>{


//           const price = room.pricePerNight;



//           if(range === "0 to 500")
//             return price <= 500;



//           if(range === "500 to 1000")
//             return price > 500 && price <= 1000;



//           if(range === "1000 to 2000")
//             return price > 1000 && price <= 2000;



//           if(range === "2000 to 3000")
//             return price > 2000 && price <= 3000;



//           return false;


//         });



//       return cityMatch && typeMatch && priceMatch;



//     })



//     .sort((a,b)=>{


//       if(sortBy === "Price low to High")
//         return a.pricePerNight - b.pricePerNight;



//       if(sortBy === "Price High to low")
//         return b.pricePerNight - a.pricePerNight;



//       if(sortBy === "Newest First")
//         return new Date(b.createdAt) - new Date(a.createdAt);



//       return 0;


//     });
//   return (
//     <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">


//       {/* Rooms Section */}

//       <div className="flex-1">


//         <div className="flex flex-col items-start text-left">

//           <h1 className="font-playfair text-4xl md:text-[40px]">
//             Hotel Rooms
//           </h1>


//           <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
//             Take advantage of our limited-time offers and special packages to
//             enhance your stay and create unforgettable memories.
//           </p>

//         </div>





//         {filteredRooms.length === 0 ? (

//           <p className="mt-10 text-gray-500">
//             No rooms found.
//           </p>


//         ) : (


//           filteredRooms.map((room)=>(


//             <div
//               key={room._id}
//               className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
//             >


//               <img

//                 onClick={()=>{

//                   navigate(`/rooms/${room._id}`);
//                   scrollTo(0,0);

//                 }}

//                 src={room.images?.[0]}
//                 alt="hotel-img"
//                 className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"

//               />





//               <div className="md:w-1/2 flex flex-col gap-2">


//                 <p className="text-gray-500">

//                   {room.hotel?.city}

//                 </p>





//                 <p

//                   onClick={()=>{

//                     navigate(`/rooms/${room._id}`);
//                     scrollTo(0,0);

//                   }}

//                   className="text-gray-800 text-3xl font-playfair cursor-pointer"

//                 >

//                   {room.hotel?.name}

//                 </p>





//                 <div className="flex items-center">

//                   <StarRating />

//                   <p className="ml-2">
//                     200+ Reviews
//                   </p>

//                 </div>





//                 <div className="flex items-center gap-1">


//                   <img
//                     src={assets.locationIcon}
//                     alt="location-icon"
//                   />


//                   <span>

//                     {room.hotel?.address}

//                   </span>


//                 </div>






//                 <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">


//                   {room.amenities?.map((item,index)=>(


//                     <div

//                       key={index}

//                       className="flex items-center gap-2 px-2 py-2 rounded-lg bg-[#f5F5FF]/70"

//                     >

//                       <img

//                         src={facilityIcons[item] || assets.badgeIcon}

//                         alt={item}

//                         className="w-5 h-5"

//                       />


//                     </div>


//                   ))}


//                 </div>





//                 <p className="text-xl font-medium text-gray-700">

//                     ৳{room.pricePerNight} /night

//                 </p>




//               </div>


//             </div>


//           ))


//         )}



//       </div>




//       {/* FILTER SECTION */}


//       <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">



//         <div
//           className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
//             openFilters ? 'border-b' : ''
//           }`}
//         >



//           <p className="text-base font-medium text-gray-800">

//             FILTERS

//           </p>





//           <span

//             onClick={()=>{

//               setSelectedTypes([]);
//               setSelectedPrices([]);
//               setSortBy("");

//             }}

//             className="hidden lg:block text-xs cursor-pointer"

//           >

//             CLEAR

//           </span>





//           <span

//             onClick={()=>setOpenFilters(!openFilters)}

//             className="lg:hidden text-xs cursor-pointer"

//           >

//             {openFilters ? "HIDE":"SHOW"}

//           </span>




//         </div>






//         <div

//           className={`${

//             openFilters ? 'h-auto':'h-0 lg:h-auto'

//           } overflow-hidden transition-all duration-700`}

//         >





//           {/* Room Type */}

//           <div className="px-5 pt-5">


//             <p className="font-medium text-gray-800 pb-2">

//               Popular Filters

//             </p>





//             {roomTypes.map((type,index)=>(



//               <CheckBox


//                 key={index}

//                 label={type}

//                 selected={selectedTypes.includes(type)}


//                 onChange={(checked)=>{


//                   if(checked){


//                     setSelectedTypes([

//                       ...selectedTypes,

//                       type

//                     ]);


//                   }

//                   else{


//                     setSelectedTypes(

//                       selectedTypes.filter(

//                         item=>item!==type

//                       )

//                     );


//                   }


//                 }}


//               />


//             ))}



//           </div>









//           {/* Price Range */}


//           <div className="px-5 pt-5">


//             <p className="font-medium text-gray-800 pb-2">

//               Price Range

//             </p>





//             {priceRanges.map((range,index)=>(



//               <CheckBox


//                 key={index}

//                 label={`$ ${range}`}


//                 selected={selectedPrices.includes(range)}



//                 onChange={(checked)=>{


//                   if(checked){


//                     setSelectedPrices([

//                       ...selectedPrices,

//                       range

//                     ]);


//                   }

//                   else{


//                     setSelectedPrices(

//                       selectedPrices.filter(

//                         item=>item!==range

//                       )

//                     );


//                   }


//                 }}


//               />


//             ))}


//           </div>


//           {/* Sort */}

//           <div className="px-5 pt-5 pb-7">


//             <p className="font-medium text-gray-800 pb-2">

//               Sort By

//             </p>

//             {sortOptions.map((option,index)=>(


//               <RadioButton


//                 key={index}

//                 label={option}


//                 selected={sortBy===option}


//                 onChange={(value)=>setSortBy(value)}


//               />


//             ))}

//           </div>

//         </div>

//       </div>

//     </div>
//   );

// };

// export default AllRooms; 


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import HotelCard from '../Component/HotelCard';
import StarRating from '../Component/StarRating';
import { assets } from '../assets/assets';

const AllRooms = () => {
    const navigate = useNavigate();
    const { rooms } = useAppContext(); // Get live rooms from context

    // --- Filter States ---
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [category, setCategory] = useState([]);
    const [priceRange, setPriceRange] = useState("");
    const [sortType, setSortType] = useState("Newest");
    const [showFilter, setShowFilter] = useState(false);

    // Toggle Room Type Filter
    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    }

    // Apply Filtering and Sorting Logic
    const applyFilter = () => {
        let temp = [...rooms];

        // 1. Filter by Room Type
        if (category.length > 0) {
            temp = temp.filter(item => category.includes(item.roomType));
        }

        // 2. Filter by Price Range
        if (priceRange) {
            const [min, max] = priceRange.split("-").map(Number);
            temp = temp.filter(item => item.pricePerNight >= min && item.pricePerNight <= max);
        }

        // 3. Apply Sorting
        switch (sortType) {
            case 'Low to High':
                setFilteredRooms(temp.sort((a, b) => (a.pricePerNight - b.pricePerNight)));
                break;
            case 'High to Low':
                setFilteredRooms(temp.sort((a, b) => (b.pricePerNight - a.pricePerNight)));
                break;
            default:
                setFilteredRooms(temp); // Default: Newest (Sorted by backend)
                break;
        }
    }

    useEffect(() => {
        if (rooms) {
            applyFilter();
        }
    }, [category, priceRange, sortType, rooms]);

    return (
        <div className='pt-32 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 bg-white min-h-screen'>
            <div className='flex flex-col lg:flex-row items-start justify-between gap-10'>
                
                {/* --- Left Side: Room Listing --- */}
                <div className='flex-1 w-full'>
                    <div className='flex flex-col items-start text-left mb-10'>
                        <h1 className='text-4xl font-bold text-gray-800 font-playfair'>Hotel Rooms</h1>
                        <p className='text-gray-500 mt-2 max-w-xl'>
                            Explore our live collection of exclusive suites and luxury rooms. 
                            Find the perfect stay that fits your budget and lifestyle.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {filteredRooms.length > 0 ? (
                            filteredRooms.map((room, index) => (
                                <HotelCard key={room._id} room={room} index={index} />
                            ))
                        ) : (
                            <div className='col-span-full py-20 text-center border-2 border-dashed rounded-3xl'>
                                <p className='text-gray-400 text-lg font-medium'>No rooms found matching your criteria.</p>
                                <button onClick={() => {setCategory([]); setPriceRange("");}} className='text-blue-600 mt-2 font-bold'>Clear All Filters</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Right Side: Filter Sidebar --- */}
                <div className='w-full lg:w-72 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-32'>
                    <div className='flex justify-between items-center mb-6'>
                        <p className='font-bold text-gray-800 uppercase tracking-wider text-sm'>Filters</p>
                        <p onClick={() => {setCategory([]); setPriceRange("");}} className='text-xs font-bold text-gray-400 cursor-pointer hover:text-blue-600 uppercase'>Clear</p>
                    </div>

                    {/* Category Filter */}
                    <div className='mb-8'>
                        <p className='font-bold text-xs text-gray-400 uppercase mb-4'>Popular Filters</p>
                        <div className='flex flex-col gap-3'>
                            {['Single Bed', 'Double Bed', 'Luxury Room', 'Family Suite'].map((type) => (
                                <label key={type} className='flex items-center gap-3 cursor-pointer group'>
                                    <input className='w-4 h-4 accent-blue-600' type="checkbox" value={type} checked={category.includes(type)} onChange={toggleCategory} />
                                    <span className='text-sm text-gray-600 group-hover:text-black transition-colors'>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className='mb-8'>
                        <p className='font-bold text-xs text-gray-400 uppercase mb-4'>Price Range</p>
                        <div className='flex flex-col gap-3'>
                            {[
                                { label: '৳ 0 - 1000', value: '0-1000' },
                                { label: '৳ 1000 - 3000', value: '1000-3000' },
                                { label: '৳ 3000 - 7000', value: '3000-7000' },
                                { label: '৳ 7000+', value: '7000-100000' }
                            ].map((range) => (
                                <label key={range.value} className='flex items-center gap-3 cursor-pointer group'>
                                    <input className='w-4 h-4 accent-blue-600' type="radio" name="price" value={range.value} checked={priceRange === range.value} onChange={(e) => setPriceRange(e.target.value)} />
                                    <span className='text-sm text-gray-600 group-hover:text-black transition-colors'>{range.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sort Dropdown */}
                    <div>
                        <p className='font-bold text-xs text-gray-400 uppercase mb-3'>Sort By</p>
                        <select onChange={(e) => setSortType(e.target.value)} className='w-full border border-gray-200 p-2 rounded-lg text-sm outline-none bg-gray-50'>
                            <option value="Newest">Newest First</option>
                            <option value="Low to High">Price: Low to High</option>
                            <option value="High to Low">Price: High to Low</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AllRooms;