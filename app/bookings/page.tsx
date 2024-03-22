import React from 'react'
import Navbar from '../components/user/navbar'
import ProfileSideBAr from '../components/user/profileSideBar'
import Bookings from '../components/user/bookings'
const page = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='bg-white py-24 md:px-10 flex justify-center'>
                <div className='flex bg-white p-4 border-2 md:w-3/4'>
                    <ProfileSideBAr page='bookings'/>
                    <Bookings/>
                </div>
            </main>
        </>
    )
}

export default page
