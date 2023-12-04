import React from 'react'
import Sidebar from '@/app/components/vendor/sidebar'
import { Toaster } from 'react-hot-toast'

import Dashbord from '@/app/components/vendor/dashbord';

const page = () => {
    return (
        <>
        <div><Toaster/></div>
        <div className='flex flex-col pt-10 md:ml-72'>
            <div className=''>
                <Sidebar page={'dashboard'} />
            </div>
            <div className='px-6'>
                <Dashbord/>
            </div>
        </div>
        </>
    )
}

export default page
