import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Title from '../../Component/Tittle';
import toast from 'react-hot-toast';
import { assets } from '../../assets/assets';

const AddOffer = () => {
    const { axios, getToken, fetchLiveOffers } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        priceOff: "",
        expiryDate: ""
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("title", inputs.title);
            formData.append("description", inputs.description);
            formData.append("priceOff", inputs.priceOff);
            formData.append("expiryDate", inputs.expiryDate);

            const token = await getToken();
            const { data } = await axios.post('/api/offers/add', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                toast.success("Offer Published Successfully!");
                // Refresh home page data
                if(fetchLiveOffers) fetchLiveOffers(); 
                // Reset form
                setInputs({ title: "", description: "", priceOff: "", expiryDate: "" });
                setImage(null);
            }
        } catch (error) {
            toast.error("Failed to add offer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-6'>
            <Title tittle='Add Exclusive Offer' subTittle='Create new deals for the home page.' />
            
            <form onSubmit={onSubmitHandler} className='mt-10 max-w-lg bg-white p-8 rounded-2xl shadow-sm border border-gray-100'>
                {/* Image Upload */}
                <div className='mb-6'>
                    <p className='font-medium mb-2'>Offer Image</p>
                    <label htmlFor="offer-img">
                        <img 
                            className='w-full h-40 object-cover rounded-xl cursor-pointer border-2 border-dashed' 
                            src={image ? URL.createObjectURL(image) : assets.uploadArea} 
                            alt="" 
                        />
                        <input type="file" id="offer-img" hidden onChange={e => setImage(e.target.files[0])} required />
                    </label>
                </div>

                <div className='flex flex-col gap-4'>
                    <input className='border p-3 rounded-xl outline-none' placeholder='Offer Title (e.g. Summer Escape)' value={inputs.title} onChange={e => setInputs({...inputs, title: e.target.value})} required />
                    <textarea className='border p-3 rounded-xl outline-none' placeholder='Short Description' rows="2" value={inputs.description} onChange={e => setInputs({...inputs, description: e.target.value})} required />
                    
                    <div className='flex gap-4'>
                        <input className='border p-3 rounded-xl outline-none flex-1' type="number" placeholder='Discount %' value={inputs.priceOff} onChange={e => setInputs({...inputs, priceOff: e.target.value})} required />
                        <input className='border p-3 rounded-xl outline-none flex-1' placeholder='Expiry (e.g. Aug 31)' value={inputs.expiryDate} onChange={e => setInputs({...inputs, expiryDate: e.target.value})} required />
                    </div>
                </div>

                <button type='submit' disabled={loading} className='w-full bg-indigo-600 text-white py-3 rounded-xl font-bold mt-8 hover:bg-indigo-700 transition-all'>
                    {loading ? "Publishing..." : "Add Live Offer"}
                </button>
            </form>
        </div>
    );
};

export default AddOffer;