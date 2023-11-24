import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const RestaurantsLoading = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
            <div className="block m-2">
                <div className="max-w-sm md:max-w-xs  bg-white border border-gray-200 rounded-lg shadow-md shadow-gray">
                    <div className='overflow-hidden'>
                        <Skeleton height={200} width={300}/>
                    </div>
                    <div className="p-3">
                        <h5 className="text-base font-bold tracking-tight text-gray-900"><Skeleton/></h5>
                        <p className="text-sm font-normal text-gray-700 dark:text-gray-500"><Skeleton/></p>
                        <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-500"><Skeleton/></p>
                    </div>
                </div>
            </div>
            <div className="block m-2">
                <div className="max-w-sm md:max-w-xs  bg-white border border-gray-200 rounded-lg shadow-md shadow-gray">
                    <div className='overflow-hidden'>
                        <Skeleton height={200} width={300}/>
                    </div>
                    <div className="p-3">
                        <h5 className="text-base font-bold tracking-tight text-gray-900"><Skeleton/></h5>
                        <p className="text-sm font-normal text-gray-700 dark:text-gray-500"><Skeleton/></p>
                        <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-500"><Skeleton/></p>
                    </div>
                </div>
            </div>
            <div className="block m-2">
                <div className="max-w-sm md:max-w-xs  bg-white border border-gray-200 rounded-lg shadow-md shadow-gray">
                    <div className='overflow-hidden'>
                        <Skeleton height={200} width={300}/>
                    </div>
                    <div className="p-3">
                        <h5 className="text-base font-bold tracking-tight text-gray-900"><Skeleton/></h5>
                        <p className="text-sm font-normal text-gray-700 dark:text-gray-500"><Skeleton/></p>
                        <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-500"><Skeleton/></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantsLoading
