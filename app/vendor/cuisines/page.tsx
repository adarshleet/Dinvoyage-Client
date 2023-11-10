import React from 'react'
import Sidebar from '@/app/components/vendor/sidebar'
import CusinesAndFacilities from '@/app/components/vendor/cusinesAndFacilities'
import { Toaster } from 'react-hot-toast'

const page = () => {
    return (
        <>
        <div><Toaster position='top-right'/></div>
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'cuisines'} />
            </div>
            <div className='pl-4 pr-10'>
                <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                    <h1 className='font-bold text-white'>CUISINES AND FACILITIES</h1>
                </div>
                <CusinesAndFacilities />
            </div>
        </div>
        </>
    )
}

export default page
