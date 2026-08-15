import HotelCard from './HotelCard'
import Tittle from './Tittle' 
// This line below was missing or incorrect, which caused the error:
import { useAppContext } from '../context/AppContext' 

const FeaturedDestination = () => {
    // Fetching real-time rooms from context
    const { rooms = [] } = useAppContext(); 

    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
            <Tittle 
                tittle='Featured Destination' 
                subTittle='Explore our newest and most exclusive hotel rooms, updated in real-time.' 
            />
            
            <div className='flex flex-wrap items-center justify-center gap-6 mt-16'>
                {rooms && rooms.length > 0 ? (
                    rooms.slice(0, 8).map((room) => (
                        <HotelCard key={room._id} room={room} />
                    ))
                ) : (
                    <div className='flex flex-col items-center py-10'>
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-400">Loading amazing destinations...</p>
                    </div>
                )}
            </div>

            
        </div>
    )
}

export default FeaturedDestination;