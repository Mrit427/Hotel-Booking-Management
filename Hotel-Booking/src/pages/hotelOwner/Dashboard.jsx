import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../Component/Tittle'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const { axios, getToken, currency } = useAppContext();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

   // Inside Dashboard.jsx
const fetchDashboardData = async () => {
    try {
        setLoading(true);
        const token = await getToken();

        // Adding timestamp to URL to force fresh data from server
        const { data } = await axios.get(`/api/bookings/hotel?t=${Date.now()}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });

        if (data.success) {
            setDashboardData(data.dashboardData);
        }
    } catch (error) {
        console.error(error);
        toast.error("Failed to load statistics");
    } finally {
        setLoading(false);
    }
};
    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) return <div className='p-10 text-center font-medium'>Loading Dashboard...</div>;

    return (
        <div className='p-5'>
            <Title 
                align='left' 
                font='outfit' 
                tittle='Dashboard' 
                subTittle='Monitor your real-time performance and guest bookings.' 
            />

            {/* Statistics Cards */}
            <div className='flex gap-4 my-8'>
                <div className='bg-blue-50 border border-blue-100 rounded-xl flex p-6 min-w-64 shadow-sm'>
                    <img src={assets.totalBookingIcon} alt="" className='h-12' />
                    <div className='ml-4'>
                        <p className='text-blue-600 font-bold'>Total Bookings</p>
                        <p className='text-2xl font-bold text-gray-800'>{dashboardData?.totalBookings || 0}</p>
                    </div>
                </div>

                <div className='bg-green-50 border border-green-100 rounded-xl flex p-6 min-w-64 shadow-sm'>
                    <img src={assets.totalRevenueIcon} alt="" className='h-12' />
                    <div className='ml-4'>
                        <p className='text-green-600 font-bold'>Total Revenue</p>
                        <p className='text-2xl font-bold text-gray-800'>{dashboardData?.totalRevenue || 0}Tk.</p>
                    </div>
                </div>
            </div>

            <h2 className='text-xl font-bold text-gray-700 mb-5'>Recent Bookings</h2>

            <div className='w-full max-w-6xl text-left border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm'>
                <table className='w-full'>
                    <thead className='bg-gray-50 border-b'>
                        <tr>
                            <th className='py-4 px-6 text-gray-600 font-semibold'>Customer</th>
                            <th className='py-4 px-6 text-gray-600 font-semibold'>Hotel</th> {/* Added Hotel column */}
                            <th className='py-4 px-6 text-gray-600 font-semibold'>Room Type</th>
                            <th className='py-4 px-6 text-gray-600 font-semibold'>Amount</th>
                            <th className='py-4 px-6 text-gray-600 font-semibold text-center'>Status</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        {dashboardData?.bookings.map((item, index) => (
                            <tr key={index} className='border-b last:border-0 hover:bg-gray-50 transition-colors'>
                                <td className='py-4 px-6 font-medium text-gray-800'>{item.user?.username || "Guest User"}</td>
                                <td className='py-4 px-6 text-indigo-600 font-medium'>{item.hotel?.name || "N/A"}</td>
                                <td className='py-4 px-6 text-gray-600'>{item.room?.roomType}</td>
                                <td className='py-4 px-6 font-bold text-gray-800'>Tk.{item.totalPrice}</td>
                                <td className='py-4 px-6 text-center'>
                                    <span className={`px-4 py-1 rounded-full text-xs font-bold ${item.isPaid ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-yellow-600'}`}>
                                        {item.isPaid ? 'Paid' : 'Pending'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {dashboardData?.bookings.length === 0 && (
                    <p className='p-10 text-center text-gray-400'>No recent bookings found.</p>
                )}
            </div>
        </div>
    )
}

export default Dashboard;