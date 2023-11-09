import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const CardRestaurant = () => {
    return (
        <div className='p-5 bg-white shadow-sm'>
            <div className="flex flex-col items-start bg-white border border-gray-200 shadow md:flex-row">
                <div className='p-4 w-full md:w-3/4 h-80 md:h-96 overflow-hidden'>
                    <Skeleton height={500}/>
                </div>
                <div className="flex flex-col justify-start h-full p-4 leading-normal w-full md:w-1/2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 "><Skeleton/></h5>
                    <p className="mb-2 font-normal text-gray-800"><Skeleton/></p>
                    <p className="mb-2 font-normal text-gray-800"><Skeleton/></p>
                    <div className='flex items-center gap-1 mb-2'>
                        <Skeleton/>
                    </div>
                    <p className='font-bold'><Skeleton/></p>
                    <p><Skeleton/></p>
                    <p className='mb-8'><Skeleton/></p>
                    <h3 className='text-lg font-bold'><Skeleton/></h3>
                </div>
            </div>
        </div>
    )
}

export default CardRestaurant
