'use client'
import { vendorLogout } from '@/apis/vendor'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setVendorLogout } from '@/redux/slices/authSlice'

const VendorLogout = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const logoutVendor = async() => {
        const res = await vendorLogout()
        if(res?.data.success){
            dispatch(setVendorLogout())
            router.push('/vendor')
        }
    }

    return (
        <>
            <button onClick={logoutVendor} className='px-4 py-2 bg-red-600 text-white font-bold rounded-lg'>LOGOUT</button>
        </>
    )
}

export default VendorLogout
