import React from 'react'
import { Toaster } from 'react-hot-toast'
import Sidebar from '@/app/components/vendor/sidebar'
import BookingDetals from '@/app/components/vendor/bookingDetals'

const page = () => {
    return (
        <>
        <div><Toaster position='top-right'/></div>
        <div className='flex flex-col pt-10 md:ml-72'>
            <div className=''>
                <Sidebar page={'bookings'} />
            </div>
            <div className='pl-4 pr-10'>
                
                <BookingDetals/>
            </div>
        </div>
    </>
  )
}

export default page
