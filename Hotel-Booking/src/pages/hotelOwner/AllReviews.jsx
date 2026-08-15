import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import Title from '../../Component/Tittle';
import toast from 'react-hot-toast';

const AllReviews = () => {
    const { axios, getToken } = useAppContext();
    const [reviews, setReviews] = useState([]);

    const fetchOwnerReviews = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/reviews/owner', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) setReviews(data.reviews);
        } catch (error) {
            toast.error("Could not load reviews");
        }
    };

    useEffect(() => { fetchOwnerReviews(); }, []);

    return (
        <div className="p-6">
            <Title tittle="Hotel Reviews" subTittle="See what guests are saying about your properties." />
            
            <div className="mt-10 grid gap-6">
                {reviews.map((rev, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{rev.hotel?.name}</p>
                                <h4 className="font-bold text-lg text-gray-800">{rev.username}</h4>
                            </div>
                            <div className="text-right">
                                <p className="text-yellow-500 font-bold">Rating: {rev.rating} ★</p>
                                <p className="text-xs text-gray-400">{new Date(rev.createdAt).toDateString()}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 italic">"{rev.comment}"</p>
                    </div>
                ))}
                {reviews.length === 0 && <p className="text-center text-gray-400 p-10">No reviews found yet.</p>}
            </div>
        </div>
    );
};

export default AllReviews;