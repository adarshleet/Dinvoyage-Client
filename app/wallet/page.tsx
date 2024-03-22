import React from 'react'
import Navbar from '../components/user/navbar'
import ProfileSideBar from '../components/user/profileSideBar'
import WalletProfile from '../components/user/walletProfile'

const page = () => {
  return (
    <>
            <header>
                <Navbar/>
            </header>
            <main className='bg-white h-full py-24 md:px-10 flex justify-center'>
                <div className='flex bg-white md:p-4 md:border-2 w-3/4'>
                    <ProfileSideBar page='wallet'/>
                    <WalletProfile/>
                </div>
            </main>
        </>
  )
}

export default page
