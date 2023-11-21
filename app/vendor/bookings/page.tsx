import React from 'react'
import { Toaster } from 'react-hot-toast'
import Sidebar from '@/app/components/vendor/sidebar'
import BookingDetals from '@/app/components/vendor/bookingDetals'

const page = () => {
    return (
        <>
        <div><Toaster position='top-right'/></div>
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'bookings'} />
            </div>
            <div className='pl-4 pr-10'>
                <div className='w-full bg-cyan-600 p-3 rounded-md mb-2'>
                    <h1 className='font-bold text-white'>ACTIVE BOOKINGS</h1>
                </div>
                <BookingDetals/>
                
            </div>
        </div>
    </>
  )
}

export default page
