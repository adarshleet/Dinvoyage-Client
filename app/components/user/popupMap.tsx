import React from 'react'
import Link from 'next/link'
import { IoMdClose } from "react-icons/io";


interface Restaurant{
    restaurant : object,
    closeModal : () => void
}

const PopupMap = ({restaurant,closeModal}:Restaurant) => {
  return (
    
    <div className='bg-white w-96 mb-2 z-100' style={{maxWidth:'400px'}}>
        <Link href={`/restaurant/${restaurant.restaurantId}`}>
            <div className='overflow-hidden max-h-56 bg-white mb-1'>
                <img src={restaurant.banner[0]} alt="" />
            </div>
        </Link>
        <div className='flex justify-between px-2 w-full pb-2'>
            <Link href={`/restaurant/${restaurant.restaurantId}`}>
            <div>
                <p className='text-xl -mb-0.5 font-bold'>{restaurant.restaurantName}</p>
                <p className='text-sm'>{restaurant.landmark}, {restaurant.locality}</p>
                <p className='text-sm text-gray-600'>₹{restaurant.minCost} for two</p>
            </div>
            </Link>
            <button onClick={closeModal}><IoMdClose className="text-2xl"/></button>
        </div>
    </div>
  )
}

export default PopupMap
