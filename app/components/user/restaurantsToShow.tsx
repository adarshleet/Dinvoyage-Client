'use client'
import React, { useEffect, useState } from 'react'
import HotelCard from './hotelCard'
import { restaurantsToDisplay } from '@/apis/user'

const RestaurantsToShow = () => {
    const [restaurants,setRestaurants] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await restaurantsToDisplay()
            console.log(res?.data.data)
            const restaurants = res?.data.data
            setRestaurants(restaurants)
        }
        fetchData()
    },[])


    return (
        <>
        {restaurants?.map((restaurant)=>(
            <HotelCard restaurant={restaurant}/>
        ))

        }
        </>
    )
}

export default RestaurantsToShow
