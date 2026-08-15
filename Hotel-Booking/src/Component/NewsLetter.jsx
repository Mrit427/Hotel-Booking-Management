import React, { useState } from 'react';
import { assets } from '../assets/assets';
import Tittle from './Tittle'; 
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const NewsLetter = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { axios } = useAppContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Ensure this matches the backend mount path
            const { data } = await axios.post('/api/subscribe', { email });

            if (data.success) {
                toast.success(data.message);
                setEmail(""); // Clear input on success
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            // This is what you were seeing. It triggers if the server is down or route is wrong.
            toast.error("Subscription failed. Check your server connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-gray-900 text-white shadow-2xl">
            <Tittle
                tittle="Stay Inspired" 
                subTittle="Join our newsletter and be the first to discover new updates and exclusive offers."
            />
            
            <form onSubmit={onSubmitHandler} className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 w-full px-4">
                <input 
                    type="email" 
                    className="bg-white/10 px-5 py-3 border border-white/20 rounded-xl outline-none max-w-md w-full focus:border-indigo-400 transition-all" 
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="flex items-center justify-center gap-2 group bg-white text-black px-10 py-3 rounded-xl font-bold active:scale-95 transition-all hover:bg-indigo-600 hover:text-white"
                >
                    {loading ? "Joining..." : "Subscribe"}
                </button>
            </form>
            
            <p className="text-gray-500 mt-6 text-xs text-center">We care about your data. Read our Privacy Policy.</p>
        </div>
    );
};

export default NewsLetter;