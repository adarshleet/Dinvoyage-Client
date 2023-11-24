import React from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/user/navbar'
import ProfileSideBAr from '../components/user/profileSideBar'
import Bookings from '../components/user/bookings'
const page = () => {
    return (
        <>
            <Toaster position='bottom-center' />
            <header>
                <Navbar />
            </header>
            <main className='bg-white py-24 md:px-10'>
                <div className='flex bg-white p-4 border-2'>
                    <ProfileSideBAr page='bookings'/>
                    <Bookings/>
                </div>
            </main>
        </>
    )
}

export default page
