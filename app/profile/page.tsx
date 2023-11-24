'use client'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/user/navbar'
import ProfileSideBAr from '../components/user/profileSideBar'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { logout } from '@/apis/user'
import { setUserLogout } from '@/redux/slices/authSlice'
const page = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const userLogout = ()=>{
        const fetchData = async() =>{
            const res = await logout()
            if(res?.data.success){
                dispatch(setUserLogout())
                router.replace('/login')
            }
        }
        fetchData()
    }


    return (
        <>
            <Toaster position='bottom-center' />
            <header>
                <Navbar/>
            </header>
            <main className='bg-white py-24 md:px-10'>
                <div className='flex bg-white p-4 border-2'>
                    <ProfileSideBAr page='profile'/>
                    <div className='p-6 w-full'>
                        <button className='bg-red-600 px-4 py-2 text-white font-bold rounded-lg' onClick={userLogout}>LogOut</button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default page
