


// __________________________________________________________
import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import Title from '../../Component/Tittle'
import HotelReg from '../../Component/HotelReg'
import toast from 'react-hot-toast'

const AddRoom = () => {
    // Added fetchAllRooms to destructuring from context
    const { axios, getToken, showHotelReg, setShowHotelReg, fetchAllRooms } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [myHotels, setMyHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState("");
    
    // State for Images
    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });

    // State for Inputs and Amenities
    const [inputs, setInputs] = useState({
        roomType: '',
        pricePerNight: '',
        amenities: {
            'Free WiFi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false
        }
    });

    // Fetch registered hotels for the dropdown from backend
    const fetchHotels = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/hotels/owner-list', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                setMyHotels(data.hotels);
            }
        } catch (error) {
            console.error("Dropdown loading failed");
        }
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    // Handle Checkbox Toggles for Amenities
    const onAmenityChange = (name) => {
        setInputs(prev => ({
            ...prev,
            amenities: { ...prev.amenities, [name]: !prev.amenities[name] }
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!selectedHotel) return toast.error("Please select a hotel");
        if (!inputs.roomType) return toast.error("Please select room type");

        setLoading(true);
        try {
            const formData = new FormData();

            // 1. Append basic Info
            formData.append('hotelId', selectedHotel);
            formData.append('roomType', inputs.roomType);
            formData.append('pricePerNight', inputs.pricePerNight);

            // 2. Filter selected amenities and convert to JSON string
            const selectedAmenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key]);
            formData.append('amenities', JSON.stringify(selectedAmenities));

            // 3. Append Images to FormData
            Object.keys(images).forEach(key => {
                if (images[key]) {
                    formData.append('images', images[key]);
                }
            });

            const token = await getToken();

            // 4. Send POST request to API
            const { data } = await axios.post('/api/rooms/', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                toast.success(data.message);
                
                // --- Real-time update for home page ---
                await fetchAllRooms(); 

                // Reset form state after success
                setInputs({
                    roomType: '',
                    pricePerNight: '',
                    amenities: { 
                        'Free WiFi': false, 'Free Breakfast': false, 'Room Service': false, 
                        'Mountain View': false, 'Pool Access': false 
                    }
                });
                setImages({ 1: null, 2: null, 3: null, 4: null });
                setSelectedHotel("");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-6 bg-white min-h-screen'>
            {/* Show Hotel Registration Modal if requested */}
            {showHotelReg && <HotelReg onRegisterSuccess={fetchHotels} />}
            
            <Title align='left' tittle='Add Room' subTittle='Select a hotel and add room details.' />

            <form onSubmit={onSubmitHandler} className='mt-8'>
                
                {/* --- Hotel Selection Dropdown --- */}
                <div className='max-w-sm mb-8'>
                    <p className='font-medium text-gray-700 mb-2'>Select Hotel</p>
                    <div className='flex gap-2'>
                        <select 
                            className='border border-gray-300 p-2 flex-1 outline-none rounded-md' 
                            value={selectedHotel} 
                            onChange={(e) => setSelectedHotel(e.target.value)} 
                            required
                        >
                            <option value="">-- Choose Registered Hotel --</option>
                            {myHotels.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
                        </select>
                    </div>
                </div>

                {/* --- Image Upload Section --- */}
                <p className='font-medium text-gray-700 mb-2'>Upload Images</p>
                <div className='flex gap-4 mb-8'>
                    {[1].map(i => (
                        <label key={i} htmlFor={`img${i}`} className='cursor-pointer'>
                            <div className='w-20 h-16 border border-gray-300 rounded flex items-center justify-center overflow-hidden bg-gray-50'>
                                <img 
                                    className={images[i] ? 'w-full h-full object-cover' : 'w-6 opacity-40'} 
                                    src={images[i] ? URL.createObjectURL(images[i]) : assets.uploadArea} 
                                    alt="" 
                                />
                            </div>
                            <input 
                                type="file" 
                                id={`img${i}`} 
                                hidden 
                                onChange={e => setImages({ ...images, [i]: e.target.files[0] })} 
                            />
                        </label>
                    ))}
                </div>

                {/* --- Room Type and Price Selection --- */}
                <div className='flex gap-4 mb-8'>
                    <div className='flex flex-col'>
                        <p className='font-medium text-gray-700 mb-2'>Room Type</p>
                        <select 
                            className='border border-gray-300 p-2 rounded-md outline-none w-48' 
                            value={inputs.roomType} 
                            onChange={e => setInputs({ ...inputs, roomType: e.target.value })} 
                            required
                        >
                            <option value="">Select Room Type</option>
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Luxury Room">Luxury Room</option>
                            <option value="Family Suite">Family Suite</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-medium text-gray-700 mb-2'>Price <span className='text-xs font-normal'>(per night)</span></p>
                        <input 
                            className='border border-gray-300 p-2 rounded-md outline-none w-24' 
                            type="number" 
                            placeholder="0" 
                            value={inputs.pricePerNight} 
                            onChange={e => setInputs({ ...inputs, pricePerNight: e.target.value })} 
                            required 
                        />
                    </div>
                </div>

                {/* --- Amenities Selection Section --- */}
                <div className='mb-10'>
                    <p className='font-medium text-gray-700 mb-3'>Amenities</p>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg'>
                        {Object.keys(inputs.amenities).map((amenity) => (
                            <label key={amenity} className='flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black'>
                                <input 
                                    type="checkbox" 
                                    className='w-4 h-4'
                                    checked={inputs.amenities[amenity]} 
                                    onChange={() => onAmenityChange(amenity)} 
                                />
                                <span className='text-sm select-none'>{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* --- Submit Button --- */}
                <button 
                    type="submit" 
                    disabled={loading} 
                    className='bg-blue-600 text-white px-10 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-all cursor-pointer'
                >
                    {loading ? 'Adding...' : 'Add Room'}
                </button>
            </form>
        </div>
    );
};

export default AddRoom;