import React from 'react'

const ProfileSideBar = () => {
    return (
        <div className='hidden md:block ps-4 py-4 bg-gray-300 font-bold text-base text-center' style={{ minHeight: '30rem', width: '15rem' }}>
            <div className='py-5 px-8'>
                <h3>Profile</h3>
            </div>
            <div className='py-5 px-14 bg-white'>
                <h3>Booking</h3>
            </div>
            <div className='py-5 px-8'>
                <h3>Wallet</h3>
            </div>
        </div>
    )
}

export default ProfileSideBar
