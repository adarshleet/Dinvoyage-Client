import Link from 'next/link'
import React from 'react'

interface restaurantProps{
    restaurant: Array<object>
}

const HotelCard = ({restaurant}:restaurantProps) => {
    return (
        <Link href={`/restaurant/${restaurant._id}`} className="block m-2">
            <div className="max-w-sm md:max-w-xs  bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray">
                <img className="rounded-t-lg" src={restaurant?.banners[0]} alt="" />
                <div className="p-3">
                    <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900">{restaurant.restaurantName}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">{restaurant.landmark}, {restaurant.locality} </p>
                </div>
            </div>
        </Link>
    )
}

export default HotelCard
