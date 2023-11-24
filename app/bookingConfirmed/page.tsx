import React from 'react'
import Navbar
 from '../components/user/navbar'
import Link from 'next/link'

const page = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='flex justify-center items-center py-24 px-4'>
                <div className='text-center'>
                    <h1 className='py-3 text-4xl'>Booking Successfull</h1>
                    <Link href={'/bookings'} className='py-2 px-3 bg-cyan-800 text-white font-bold'>GO TO BOOKING DETAILS</Link>
                </div>
            </main>
        </>
    )
}

export default page
