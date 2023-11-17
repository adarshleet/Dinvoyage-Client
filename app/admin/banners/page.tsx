import React from 'react'
import Sidebar from '@/app/components/admin/sidebar'
import Banners from '@/app/components/admin/banners'
import { Toaster } from 'react-hot-toast'

const page = () => {
    return (
        <>
        <Toaster position='top-right'/>
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'banners'} />
            </div>
            <div className='pl-4 pr-10'>
                <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                    <h1 className='font-bold text-white'>BANNERS</h1>
                </div>
                <Banners/>
            </div>
        </div>
        </>
    )
}

export default page
