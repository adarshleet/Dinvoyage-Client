'use client'
import { singleRestaurant } from '@/apis/user'
import Navbar from '@/app/components/user/navbar'
import RestaurantBooking from '@/app/components/user/restaurantBooking'
import RestaurantCard from '@/app/components/user/restaurantCard'
import React,{useEffect,useState} from 'react'
import { Toaster } from 'react-hot-toast'

interface restaurantProps {
    params: {
        id:string
    }
}


const Usepage = ({ params }: restaurantProps) => {

    const [restaurant,setRestaurant] = useState<any>({})

    const { id } = params

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await singleRestaurant(id)
            const restaurant = res?.data.data
            console.log(restaurant)
            setRestaurant(restaurant)
        }
        fetchData()
    },[id])

    return (
        <>
        <Toaster position='bottom-center'/>
            <header>
                <Navbar/>
            </header>
            <main className='flex justify-center py-24 px-4'>
                <div>
                    <RestaurantCard restaurant={restaurant} booking={true}/>
                    <RestaurantBooking openingTime={restaurant?.openingTime} closingTime={restaurant?.closingTime} restaurantId={restaurant?._id}/>
                </div>
            </main>
        </>
    )
}

export default Usepage
