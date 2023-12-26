'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/user/navbar'
import RestaurantCard from '../../components/user/restaurantCard'
import { addReview, averageRating, editReview, findReview, singleRestaurant, userInBooking } from '@/apis/user'
import { GoStarFill, GoStar } from "react-icons/go";
import Reviews from '@/app/components/user/reviewModal'
import AllReviews from '@/app/components/user/allReviews'
import { FaChevronDown } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import Link from 'next/link'

interface restaurantProps {
    params: {
        id: string
    }
}

interface Rating {
    totalCount: number,
    averageRating: number
}

interface Restaurant {
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
}

const Usepage = ({ params }: restaurantProps) => {

    const [restaurant, setRestaurant] = useState<Restaurant>()

    const [rating, setRating] = useState(0);
    const [reviewModal, setReviewModal] = useState(false)
    const [showReviews, setShowReviews] = useState(false)
    const [averageRatings, setAverageRatings] = useState<Rating | null>(null)

    const [review,setReview] = useState('')

    //setting user from booking to check user is able to review
    const [userFound, setUserFound] = useState(false)

    const [reviewFound,setReviewFound] = useState(false)

    const handleClick = (newRating: number) => {
        setRating(newRating);
        setReviewModal(true)
        // onChange(newRating);
    };

    const { id } = params

    useEffect(() => {
        const fetchData = async () => {
            const res = await singleRestaurant(id)
            const restaurant = res?.data.data
            setRestaurant(restaurant)


            // average rating of restaurant
            const response = await averageRating(id)
            const averageRatings = response?.data.data
            setAverageRatings(averageRatings)

            //checking is user is able to add review
            const resp = await userInBooking(id)
            if (resp?.data.data) {
                setUserFound(true)
            }


            //getting the review
            const review = await findReview(id)
            const reviewFound = review?.data.data.reviews[0]
            if(reviewFound){
                setRating(reviewFound.rating)
                setReview(reviewFound.review)
                setReviewFound(true)
            }

        }
        fetchData()
    }, [id])


    const closeModal = () => {
        setReviewModal(false)
    }

    const handleReviewSubmit = async()=>{
        try {
            if(review.trim().length == 0){
                return
            }

            const newReview={
                rating,
                review
            }


            if(reviewFound){
                const res = await editReview(restaurant?._id,newReview)
                if(res?.data.data){
                    setReviewModal(false)
                    setReviewFound(true)
                }
            }

            else{
                const res = await addReview(restaurant?._id,newReview)
                if(res?.data.data){
                    setReviewModal(false)
                }
            }
            

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='flex justify-center py-24 px-4'>
                <div>
                    <RestaurantCard restaurant={restaurant as Restaurant} booking={false} />
                    <div className='bg-white my-6 shadow flex'>
                        {/* <div className='hover:border-b-4 hover:pb-1 hover:text-orange-500 border-orange-500 py-2 px-6'>
                            <h3 className='font-bold'>Menu</h3>
                        </div> */}
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
                    {/* <div className='bg-white shadow p-3 mb-6'>
                        <h3 className='font-bold mb-1'>Menu</h3>
                        <div className="w-28 h-28 overflow-hidden">
                            <img src="https://b.zmtcdn.com/data/menus/533/900533/56c75b3e0de767c159c3b97994b98be0.jpg" alt="" />
                        </div>
                    </div> */}
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
                                        {restaurant && restaurant?.cuisines?.map((cuisine: string,index) => (
                                            <p key={index}>{cuisine}</p>
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
                                        <p>₹{restaurant?.minCost} for two people</p>
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
                                    {restaurant && restaurant?.facilities?.map((facility: string,index) => (
                                        <p key={index}>{facility}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white shadow p-3 mb-6'>
                        <h3 className='font-bold mb-3'>Ratings & Reviews</h3>
                        <div className='border border-1 px-3 py-10 flex text-center'>
                            <div className='w-1/2 flex flex-col items-center gap-1 justify-center'>
                                {averageRatings ?
                                    <>
                                        <div className='py-3 px-3 bg-orange-600 rounded-md w-fit text-2xl font-bold text-white'>
                                            <p className='flex gap-2 items-center'>{averageRatings?.averageRating?.toFixed(1)} <GoStarFill /></p>
                                        </div>
                                        <p className='font-bold text-gray-500'>{averageRatings?.totalCount} Reviews</p>
                                    </>
                                    :
                                    <p className='px-4'>This restaurant has been recently added. There are no ratings or reviews available yet</p>
                                }
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
                                                <GoStar className="text-3xl text-gray-400" />
                                            )}
                                        </span>
                                    ))}
                                </div>
                                <p>Rate this restaurant</p>
                            </div>
                        </div>
                        {!showReviews && averageRatings ?
                            <div className='w-full text-center py-2 font-bold text-blue-500 cursor-pointer' onClick={() => setShowReviews(true)}>
                                <p className='flex items-center justify-center gap-1'>View All Reviews <FaChevronDown /></p>
                            </div>
                            :
                            <AllReviews restaurantId={restaurant?._id} />
                        }
                    </div>
                    <div className='bg-white shadow p-3 mb-6'>
                        <h3 className='font-bold mb-1'>We are here to help</h3>
                        <Link href={`tel:${restaurant?.contactNumber}`} className="flex items-center gap-3">
                            <div className='p-2 rounded-full bg-cyan-600'>
                                <IoCall className="text-3xl text-white"/>
                            </div>
                            <div>
                                <p>Call the restaurant</p>
                                <p>{restaurant?.contactNumber}</p>
                            </div>
                        </Link>
                    </div>
                </div>
                
            </main>
            <Reviews rating={rating} handleClick={handleClick} reviewModal={reviewModal} closeModal={closeModal} 
            userFound={userFound} review={review} setReview={setReview} handleReviewSubmit={handleReviewSubmit} reviewFound={reviewFound}/>
        </>
    )
}

export default Usepage
