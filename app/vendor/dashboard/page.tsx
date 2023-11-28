import React from 'react'
import Sidebar from '@/app/components/vendor/sidebar'
import VendorLogout from '@/app/components/vendor/vendorLogout'
import { Toaster } from 'react-hot-toast'
import { FaUserCircle } from "react-icons/fa";
import Link from 'next/link';

const page = () => {
    return (
        <>
        <div><Toaster/></div>
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'dashboard'} />
            </div>
            <div className='px-6'>
                <div className='border shadow bg-white p-4 flex justify-between items-center'>
                    <h3 className='font-bold text-lg'>VENDOR DASHBOARD</h3>
                    <div className='flex items-center gap-4'>
                        <Link href={'/vendor/profile'}><FaUserCircle className='text-3xl text-slate-800'/></Link>
                        <VendorLogout />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default page
