import React from 'react'
import Sidebar from '@/app/components/vendor/sidebar'
import EditRestaurantForm from '@/app/components/vendor/editRestaurantForm'

interface restaurantProps {
    params:{
        id:string
    }
}

const page = ({ params }: restaurantProps) => {

    const { id } = params



    return (
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'restaurants'} />
            </div>
            <div className='pl-4 pr-10'>
                <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                    <h1 className='font-bold text-white'>EDIT RESTAURANT DETAILS</h1>
                </div>
                <div className='p-5 bg-white shadow-sm'>
                    <EditRestaurantForm restaurantId={id}/>
                </div>
            </div>
        </div>
    )
}

export default page