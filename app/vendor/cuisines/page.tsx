import React from 'react'
import Sidebar from '@/app/components/vendor/sidebar'
import CusinesAndFacilities from '@/app/components/vendor/cusinesAndFacilities'

const page = () => {
    return (
        <>
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'cuisines'} />
            </div>
            <div className='pl-4 pr-10'>
                <CusinesAndFacilities />
            </div>
        </div>
        </>
    )
}

export default page
