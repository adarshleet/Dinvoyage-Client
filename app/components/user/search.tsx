'use client'
import { searchRestaurants } from '@/apis/user'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Search = () => {

    const [searchQuery, setSearchQuery] = useState<string | null>(null)
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await searchRestaurants(searchQuery)
                const restaurants = res?.data.data
                setRestaurants(restaurants)
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [searchQuery])

    return (
        <div>
            <div className="flex justify-center pt-16 px-4 items-center container mx-auto">
                <div style={{ width: '50rem' }}>
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold py-2 text-center" style={{ color: '#94A911' }}>Indulge your cravings with peace of mind! </h1>
                        <div className="flex bg-white border-2 rounded-md">
                            <input
                                placeholder="Search for  Restaurants, Locations "
                                className="w-full border-gray-300  focus:outline-none p-3"
                                type="text"
                                value={searchQuery !== null ? searchQuery : ''}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {/* <button className="px-4 m-2 text-white font-bold rounded-md" style={{ backgroundColor: "#247F9E" }}>Search</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center pb-16 px-4 items-center '>
                {restaurants.length != 0 && <div className='bg-white sticky overflow-y-scroll' style={{ maxHeight: '15rem' }}>
                    {restaurants.map((restaurant, index) => (
                        <Link href={`/restaurant/${restaurant._id}`}>
                            <div className='flex py-4 px-10 gap-2 hover:bg-gray-200' key={index}>
                                <div className='overflow-hidden' style={{ width: '5rem' }}>
                                    <img src={restaurant.banners} alt="" />
                                </div>
                                <div className='text-gray-500 '>
                                    <p className=''>{restaurant.restaurantName}</p>
                                    <p className='text-sm'>{restaurant.landmark}, {restaurant.locality}</p>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>}
            </div>
        </div>
    )
}

export default Search
