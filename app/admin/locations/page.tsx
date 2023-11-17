import React from 'react'
import Sidebar from '@/app/components/admin/sidebar'
import LocationTable from '@/app/components/admin/locationTable'
import LocationModal from '@/app/components/admin/locationModal'
import { Toaster } from 'react-hot-toast'

const page = () => {
    return (
        <>
        <Toaster position='top-right'/>
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'locations'} />
            </div>
            <div className='px-6'>
                <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                    <h1 className='font-bold text-white'>LOCATIONS</h1>
                </div>
                <LocationTable/>
            </div>
        </div>
        </>
    )
}

export default page
