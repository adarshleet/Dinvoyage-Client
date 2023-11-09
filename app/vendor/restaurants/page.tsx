import React from 'react'
import Sidebar from '@/app/components/vendor/sidebar'
import RestaurantCard from '@/app/components/vendor/restaurantCard'

const page = () => {
    return (
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'restaurants'} />
            </div>
            <div className='pl-4 pr-10'>
                <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                    <h1 className='font-bold text-white'>RESTAURANT DETAILS</h1>
                </div>
                <RestaurantCard />
            </div>
        </div>
    )
}

export default page
