'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { adminLogout } from '@/apis/admin'
import { useDispatch } from 'react-redux'
import { setAdminLogout } from '@/redux/slices/authSlice'

const AdminLogout = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const logoutAdmin = async() => {
        const res = await adminLogout()
        if(res?.data.success){
            dispatch(setAdminLogout())
            router.replace('/admin')
        }
    }

    return (
        <>
            <button onClick={logoutAdmin} className='px-4 py-2 bg-red-600 text-white font-bold rounded-lg'>LOGOUT</button>
        </>
    )
}

export default AdminLogout
