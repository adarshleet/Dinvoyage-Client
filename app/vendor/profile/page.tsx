import React from 'react'
import Sidebar from '@/app/components/vendor/sidebar'
import VendorProfile from '@/app/components/vendor/vendorProfile'

const page = () => {
    return (
        <>
            <div className='flex flex-col pt-10 md:ml-72'>
                <div className=''>
                    <Sidebar page={'dashboard'} />
                </div>
                <div className='pl-4 pr-10'>
                    <VendorProfile/>
                </div>
            </div>
        </>
    )
}

export default page
