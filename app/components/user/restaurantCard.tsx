import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GrMapLocation } from 'react-icons/gr'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface restaurantProps {
    restaurant: {
        _id: string,
        restaurantName: string
        openingTime: string,
        closingTime: string,
        banners: Array<string>
        landmark: string
        locality: string,
        googlemapLocation: string
        cuisines: string[],
        facilities: string[],
        minCost: number,
        contactNumber: string
    },
    booking: boolean
}
const RestaurantCard = ({ restaurant, booking }: restaurantProps) => {

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
    const openingTime = timeFormat(restaurant?.openingTime)
    const closingTime = timeFormat(restaurant?.closingTime)

    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 shadow md:flex-row md:max-w-4xl">
            <div style={{ maxWidth: '40rem', maxHeight: '22.5rem' }}  className='overflow-hidden flex justify-center items-center md:min-h-64'>
                {restaurant?.banners && restaurant.banners.length > 0 ? (
                    <Image width={700} height={400} className="" src={restaurant?.banners[0]} alt=""/>
                ) :
                    <div className='w-full h-full overflow-hidden'>
                        <Skeleton className='w-60' />
                    </div>
                }
            </div>
            <div className="flex flex-col justify-start h-full p-4 leading-normal w-full md:w-1/2">
                <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 ">{restaurant?.restaurantName}</h5>
                <p className="mb-2 font-normal text-gray-500">{restaurant?.landmark}, {restaurant?.locality}</p>
                <p className="mb-2 font-normal text-gray-500">₹{restaurant?.minCost} for two</p>
                <a href={restaurant?.googlemapLocation} target="_blank">
                    <p className='font-bold text-md text-blue-500 mb-1'><i className="fa-solid fa-location-arrow"></i> Get Direction</p>
                </a>
                <div className='mb-8'>
                    <p className='font-semibold'>Time</p>
                    <p>Opens at {openingTime}</p>
                    <p>Closes at {closingTime}</p>
                </div>
                {!booking &&
                    <Link href={`/restaurantBooking/${restaurant?._id}`} className="py-2 text-white font-bold text-center" style={{ backgroundColor: '#247F9E' }}>BOOK A TABLE</Link>
                }
            </div>
        </div>
    )
}

export default RestaurantCard
