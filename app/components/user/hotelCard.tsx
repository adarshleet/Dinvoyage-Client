import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface restaurantProps{
    restaurant: {
        _id:string
        banners : Array<string>
        restaurantName : string
        landmark  : string
        locality : string,
        minCost : number
    }
}

const HotelCard = ({restaurant}:restaurantProps) => {
    return (
        <Link href={`/restaurant/${restaurant._id}`} className="block m-2">
            <div className="max-w-sm md:max-w-xs  bg-white border border-gray-200 rounded-lg shadow-md shadow-gray overflow-hidden hover:shadow-2xl">
                <div className='overflow-hidden flex justify-center items-center' style={{maxHeight:'11rem',minHeight:'11rem'}}>
                    <Image height={179} width={360} className="rounded-t-lg object-cover" src={restaurant?.banners[0]} alt="" style={{maxHeight:"11rem",minHeight:'11rem'}}/>
                </div>
                <div className="p-3">
                    <h5 className="text-base font-bold tracking-tight text-gray-900">{restaurant?.restaurantName}</h5>
                    <p className="text-sm font-normal text-gray-700 dark:text-gray-500">{restaurant?.landmark}, {restaurant?.locality} </p>
                    <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-500">₹{restaurant.minCost} for two</p>
                </div>
            </div>
        </Link>
    )
}

export default HotelCard
