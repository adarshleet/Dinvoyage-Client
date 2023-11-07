import React from 'react'
import Sidebar from '@/app/components/vendor/sidebar'
import VendorLogout from '@/app/components/vendor/vendorLogout'
import { Toaster } from 'react-hot-toast'

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
                    <VendorLogout />
                </div>
            </div>
        </div>
        </>
    )
}

export default page
