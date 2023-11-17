import Link from 'next/link'
import React from 'react'
import { GrMapLocation } from 'react-icons/gr'

interface restaurantProps {
    restaurant: object,
    booking: boolean
}
const RestaurantCard = ({ restaurant,booking }: restaurantProps) => {

    function timeFormat(time: string) {
        const originalTime: string | undefined = time
        const [hours, minutes] = originalTime ? originalTime.split(':') : ['', ''];
        const formattedTime = new Date(0, 0, 0, parseInt(hours, 10), parseInt(minutes, 10)).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        return formattedTime
    }
    const openingTime = timeFormat(restaurant.openingTime)
    const closingTime = timeFormat(restaurant.closingTime)


    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 shadow md:flex-row md:max-w-4xl">
            <div>
                <img className="" src={restaurant.banners} alt="" />
            </div>
            <div className="flex flex-col justify-start h-full p-4 leading-normal w-full md:w-1/2">
                <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 ">{restaurant.restaurantName}</h5>
                <p className="mb-2 font-normal text-gray-500">{restaurant.landmark}, {restaurant.locality}</p>
                <p className="mb-2 font-normal text-gray-500">₹{restaurant.minCost} for two</p>
                <a href={restaurant.googlemapLocation} target="_blank">
                    <p className='font-bold text-md text-blue-500 mb-1'><i className="fa-solid fa-location-arrow"></i> Get Direction</p>
                </a>
                <div className='mb-8'>
                    <p className='font-semibold'>Time</p>
                    <p>Opens at {openingTime}</p>
                    <p>Closes at {closingTime}</p>
                </div>
                {!booking &&
                    <Link href={`/restaurantBooking/${restaurant._id}`} className="py-2 text-white font-bold text-center" style={{ backgroundColor: '#247F9E' }}>BOOK A TABLE</Link>
                }
            </div>
        </div>
    )
}

export default RestaurantCard
