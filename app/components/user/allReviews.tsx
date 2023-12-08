'use client'
import { getReviews } from '@/apis/user';
import React, { useEffect, useState } from 'react'
import { GoStarFill } from "react-icons/go";

interface reviewProps{
    restaurantId?:string
}

interface Review{
    userId ?: {
        name:string
    },
    rating ?: number,
    review ?: string
}

const AllReviews = ({restaurantId}:reviewProps) => {

    const [reviews,setReviews] = useState([])

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                if(restaurantId){
                    const res = await getReviews(restaurantId)
                    const data = res?.data.data
                    setReviews(data.reviews)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    return (
        <div className='max-h-96 overflow-y-scroll my-5'>
            {reviews.map((review:Review,index)=>(
                <div className='py-4 px-4 border-b whitespace-normal max-w-3xl' key={index}>
                    <p className='font-bold'>{review.userId?.name}</p>
                    <p className='flex items-center text-orange-500 font-bold gap-0.5'>{review.rating} <GoStarFill /></p>
                    <p className='text-sm'>{review.review}</p>
                </div>
            ))}
        </div>
    )
}

export default AllReviews
