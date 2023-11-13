import React, { useEffect, useState } from 'react'
import Sidebar from '@/app/components/admin/sidebar';
import RestaurantCard from '@/app/components/admin/restaurantCard';

interface requestProps {
    params: string
}

const page = ({ params }: requestProps) => {

    const { id } = params

    

    return (
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'request'} />
            </div>
            <div className='pl-4 pr-10'>
                <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                    <h1 className='font-bold text-white'>REQUESTED RESTAURANT DETAILS </h1>
                </div>
                <RestaurantCard id={id}/>
            </div>
        </div>
    )
}

export default page
