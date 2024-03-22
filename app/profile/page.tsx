'use client'
import React from 'react'
import Navbar from '../components/user/navbar'
import ProfileSideBAr from '../components/user/profileSideBar'

import Profile from '../components/user/profile'
const page = () => {

    


    return (
        <>
            <header>
                <Navbar/>
            </header>
            <main className='bg-white h-full py-24 md:px-10 flex justify-center'>
                <div className='flex bg-white md:p-4 md:border-2 w-3/4'>
                    <ProfileSideBAr page='profile'/>
                    <Profile/>
                </div>
            </main>
        </>
    )
}

export default page
