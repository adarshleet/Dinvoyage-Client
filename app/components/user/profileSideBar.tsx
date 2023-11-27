import React from 'react'
import Link from 'next/link'

interface sideBarProps{
    page: string
}
const ProfileSideBar = ({page}:sideBarProps) => {
    return (
        <div className='hidden md:block col-span-1 ps-4 py-4 bg-cyan-100 font-bold text-base text-center' style={{ minHeight: '30rem', width: '18rem' }}>
            <div className={`py-5 px-8 ${page=='profile' && 'bg-white'}`}>
                <Link href={'/profile'}>Profile</Link>
            </div>
            <div className={`py-5 px-8 ${page=='bookings' && 'bg-white'}`}>
                <Link href={'/bookings'}>Booking</Link>
            </div>
            <div className={`py-5 px-8 ${page=='wallet' && 'bg-white'}`}>
                <Link href={'/wallet'}>Wallet</Link>
            </div>
        </div>
    )
}

export default ProfileSideBar
