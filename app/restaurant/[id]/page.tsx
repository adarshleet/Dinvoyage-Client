'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/user/navbar'
import RestaurantCard from '../../components/user/restaurantCard'
import { singleRestaurant } from '@/apis/user'
import { GoStarFill,GoStar } from "react-icons/go";

interface restaurantProps {
    params: {
        id: string
    }
}

const page = ({ params }: restaurantProps) => {

    const [restaurant, setRestaurant] = useState({})

    const [rating, setRating] = useState(0);

    const handleClick = (newRating:number) => {
        console.log(newRating)
        setRating(newRating);
        // onChange(newRating);
    };

    const { id } = params

    useEffect(() => {
        const fetchData = async () => {
            const res = await singleRestaurant(id)
            const restaurant = res?.data.data
            console.log(restaurant.banners[0])
            setRestaurant(restaurant)
        }
        fetchData()
    }, [])



    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='flex justify-center py-24 px-4'>
                <div>
                    <RestaurantCard restaurant={restaurant} booking={false} />
                    <div className='bg-white my-6 shadow flex'>
                        <div className='hover:border-b-4 hover:pb-1 hover:text-orange-500 border-orange-500 py-2 px-6'>
                            <h3 className='font-bold'>Menu</h3>
                        </div>
                        <div className='hover:border-b-4 hover:pb-1 hover:text-orange-500 border-orange-500 py-2 px-6'>
                            <h3 className='font-bold'>About</h3>
                        </div>
                        <div className='hover:border-b-4 hover:pb-1 hover:text-orange-500 border-orange-500 py-2 px-6'>
                            <h3 className='font-bold'>Reviews</h3>
                        </div>
                        <div className='hover:border-b-4 hover:pb-1 hover:text-orange-500 border-orange-500 py-2 px-6'>
                            <h3 className='font-bold'>Help</h3>
                        </div>
                    </div>
                    <div className='bg-white shadow p-3 mb-6'>
                        <h3 className='font-bold mb-1'>Menu</h3>
                        <div className="w-28 h-28 overflow-hidden">
                            <img src="https://b.zmtcdn.com/data/menus/533/900533/56c75b3e0de767c159c3b97994b98be0.jpg" alt="" />
                        </div>
                    </div>
                    <div className='bg-white shadow p-3 mb-6'>
                        <h3 className='font-bold mb-4'>About</h3>
                        <div>
                            <div className='flex items-start mb-6'>
                                <div className='bg-cyan-600 px-2 py-1.5 mr-2 rounded-full'>
                                    <i className="fa-solid fa-utensils text-lg text-white m-1"></i>
                                </div>
                                <div>
                                    <h4 className='text-cyan-600 font-bold'>CUISINES</h4>
                                    <div className='capitalize grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2'>
                                        {restaurant && restaurant?.cuisines?.map((cuisine) => (
                                            <p>{cuisine}</p>
                                        ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-start mb-6'>
                                <div className='bg-cyan-600 px-2.5 py-1.5 mr-2 rounded-full'>
                                    <i className="fa-solid fa-indian-rupee-sign text-lg text-white m-1"></i>
                                </div>
                                <div>
                                    <h4 className='text-cyan-600 font-bold'>AVERAGE COST</h4>
                                    <div>
                                        <p>₹{restaurant.minCost} for two people</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='flex items-start'>
                                    <div className='bg-cyan-600 px-1.5 py-1.5 mr-2 rounded-full'>
                                        <i className="fa-solid fa-list text-lg text-white m-1"></i>
                                    </div>
                                    <div>
                                        <h4 className='text-cyan-600 font-bold'>FACILITIES & FEATURES</h4>
                                    </div>
                                </div>
                                <div className='ps-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                                    {restaurant && restaurant?.facilities?.map((facility) => (
                                        <p>{facility}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white shadow p-3'>
                        <h3 className='font-bold mb-3'>Ratings & Reviews</h3>
                        <div className='border border-1 px-3 py-10 flex text-center'>
                            <div className='w-1/2 flex flex-col items-center gap-1 justify-center'>
                                <div className='py-3 px-3 bg-orange-600 rounded-md w-fit text-2xl font-bold text-white'>
                                    <p className='flex gap-2 items-center'>3.4 <GoStarFill /></p>
                                </div>
                                <p className='font-bold text-gray-500'>4 Reviews</p>
                            </div>
                            <div className='w-1/2 flex flex-col gap-4 items-center justify-center'>
                                <div className='flex gap-2'>
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <span
                                            key={index}
                                            onClick={() => handleClick(index)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {index <= rating ? (
                                                <GoStarFill className="text-3xl" style={{ color: 'gold' }} />
                                            ) : (
                                                <GoStar className="text-3xl text-gray-400"/>
                                            )}
                                        </span>
                                    ))}
                                </div>
                                <p>Rate this restaurant</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default page
