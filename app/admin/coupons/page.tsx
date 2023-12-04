import React from 'react'
import { Toaster } from 'react-hot-toast'
import Sidebar from '@/app/components/admin/sidebar'
import CouponTable from '@/app/components/admin/couponTable'


const page = () => {



    return (
        <>
            <div><Toaster position='top-right' /></div>
            <div className='flex flex-col pt-16 md:ml-72'>
                <div className=''>
                    <Sidebar page='coupons' />
                </div>

                <div className='px-4'>
                    <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                        <h1 className='font-bold text-white'>COUPONS</h1>
                    </div>
                    <CouponTable/>
                </div>

            </div>
        </>
    )
}

export default page
