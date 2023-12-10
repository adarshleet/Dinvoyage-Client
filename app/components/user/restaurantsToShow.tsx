'use client'
import React, { useEffect, useState } from 'react'
import HotelCard from './hotelCard'
import { restaurantsToDisplay } from '@/apis/user'
import Filters from './filters'
import RestaurantsLoading from '../loadingPages/restaurantsLoading'

const RestaurantsToShow = () => {
    const [restaurants, setRestaurants] = useState([])
    const [loading,setLoading] = useState(true)
    

    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            const res = await restaurantsToDisplay(page)
            const data = res?.data.data
            if(data.restaurants){
                setLoading(false)
                setRestaurants(data.restaurants)
                setTotalPages(data.totalPages)
            }
        }
        fetchData()
    }, [page])


    return (
        <>
        <div className='flex justify-center py-10 px-6'>
            <div className='flex justify-center gap-4'>
                <Filters setRestaurant={setRestaurants}/>
                <div>
                    <h1 className='font-bold text-lg'>Best Restaurants Near</h1>
                    {loading ?
                    <RestaurantsLoading/>
                    :
                    (!loading && restaurants.length == 0) ? 
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2'>
                        <div className='p-6 text-xl'>
                            <h1 className='text-center'>Ooops!!! No Restaurants Found</h1>
                        </div>
                    </div>
                    :
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                        {restaurants?.map((restaurant, index) => (
                            <HotelCard key={index} restaurant={restaurant} />
                        ))}
                    </div>}
                    <div className='flex mt-5'>
                        <button className='p-2 border-4 font-bold' disabled={page==1} onClick={()=>setPage(page-1)}>Prev</button>
                        <button className='p-2 border-4 font-bold'>{page}</button>
                        <button className='p-2 border-4 font-bold' disabled={page==totalPages+1} onClick={()=>setPage(page+1)}>Next</button>
                    </div>
                </div>
            </div>
        </div>    
        </>
    )
}

export default RestaurantsToShow
