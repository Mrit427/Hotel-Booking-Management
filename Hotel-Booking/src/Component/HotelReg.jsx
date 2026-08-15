import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const HotelReg = ({ onRegisterSuccess }) => {
    const { axios, getToken, setShowHotelReg } = useAppContext();
    const [loading, setLoading] = useState(false);
    
    // Form Input States
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = await getToken();
            
            
            const { data } = await axios.post('/api/hotels/register', 
                { name, contact, address, city }, // Keys must match backend
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                toast.success(data.message);
                setShowHotelReg(false);
                if(onRegisterSuccess) onRegisterSuccess(); // Refresh dropdown if needed
                window.location.reload(); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            
            const errorMsg = error.response?.data?.message || "Registration failed";
            toast.error(errorMsg);
            console.error("Hotel Reg Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4'>
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-2xl max-w-md w-full relative shadow-2xl'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6'>Register New Hotel</h2>
                
                <div className='flex flex-col gap-4'>
                    <input className='border p-3 rounded-lg outline-none focus:border-indigo-500' placeholder='Hotel Name' required value={name} onChange={e => setName(e.target.value)} />
                    <input className='border p-3 rounded-lg outline-none focus:border-indigo-500' placeholder='Contact (+880...)' required value={contact} onChange={e => setContact(e.target.value)} />
                    <input className='border p-3 rounded-lg outline-none focus:border-indigo-500' placeholder='Full Address' required value={address} onChange={e => setAddress(e.target.value)} />
                    <input className='border p-3 rounded-lg outline-none focus:border-indigo-500' placeholder='City' required value={city} onChange={e => setCity(e.target.value)} />
                </div>

                <div className='flex gap-4 mt-8'>
                    <button type='submit' disabled={loading} className='bg-indigo-600 text-white flex-1 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all'>
                        {loading ? 'Saving...' : 'Register'}
                    </button>
                    <button type='button' onClick={() => setShowHotelReg(false)} className='bg-gray-100 text-gray-600 flex-1 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all'>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default HotelReg;