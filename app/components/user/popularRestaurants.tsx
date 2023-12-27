'use client'
import React, { useEffect, useState } from 'react'
import HotelCard from './hotelCard'
import { popularRestaurants } from '@/apis/user'


interface restaurant{
        _id:string
        banners : Array<string>
        restaurantName : string 
        landmark  : string
        locality : string,
        minCost : number
    }

const PopularRestaurants = () => {


    const [restaurants,setRestaurants] = useState<restaurant[]>([])


    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await popularRestaurants()
                console.log(res?.data.data)
                setRestaurants(res?.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    return (
        <div className="bg-white py-16 px-4 flex justify-center">
            <div className="flex flex-col" style={{ width: '65rem' }}>
                <h1 className="text-xl font-bold py-2">Popular Restaurants</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {restaurants.map((restaurant,index)=>(
                        <HotelCard restaurant={restaurant} key={index}/>
                    ))
                    }

                </div>
            </div>
        </div>
    )
}

export default PopularRestaurants
