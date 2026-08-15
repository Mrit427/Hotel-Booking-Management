// import React, { useEffect } from 'react'
// import Navbar from '../../Component/hotelOwner/Navbar'
// import Sidebar from '../../Component/hotelOwner/Sidebar'
// import { Outlet } from 'react-router-dom'
// import {useAppContext} from '../../context/AppContext'


// const Layout = () => {
//   const {isOwner, navigate} = useAppContext()

//   useEffect(()=>{
//     if(!isOwner){
//       navigate('/')
//     }
//   },[isOwner])

//   return (
//     <div className='flex flex-col h-screen'>
//         <Navbar/>
//         <div className='flex h-full'>
//             <Sidebar/>
//             <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
//                 <Outlet/>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Layout

import React, { useEffect } from 'react'
import Sidebar from '../../Component/hotelOwner/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom' // Ensure useNavigate is imported
import { useAppContext } from '../../context/AppContext'
import Navbar from '../../Component/hotelOwner/Navbar'

const Layout = () => {
    // Correct way: use the hook directly inside the component
    const navigate = useNavigate(); 
    const { isOwner } = useAppContext(); 

    useEffect(() => {
        // If not an owner, redirect to home
        if (!isOwner) {
            navigate('/');
        }
    }, [isOwner, navigate]);

    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex h-full'>
                <Sidebar />
                <div className='flex-1 p-4 pt-10 md:px-10 h-full overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout