'use client'
import { getRestaurant } from '@/apis/vendor'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { GrMapLocation } from 'react-icons/gr'
import {BsFillArrowLeftSquareFill,BsFillArrowRightSquareFill} from 'react-icons/bs'
import CardRestaurant from '../loadingPages/cardRestaurant'
import { FaEdit } from "react-icons/fa";
import Image from 'next/image'

const RestaurantCard = () => {
    const [restaurant, setRestaurant] = useState<any>({})
    const [allRestaurant,setAllRestaurant] = useState<any>([])
    const [page,setPage] = useState(0)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getRestaurant();
                if (res?.data) {
                    const restaurantData = res.data.data;
                    setAllRestaurant(restaurantData);
                    setRestaurant(restaurantData[page])
                    setLoading(false)
                }
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        };
        fetchData();
    }, [page]);


    const pagePlus = ()=>{
        setPage(page+1)
        setRestaurant(allRestaurant[page+1])
    }

    const pageMinus = () =>{
        setPage(page-1)
        setRestaurant(allRestaurant[page-1])
    }
    

    let status
    switch (restaurant?.status) {
        case 1:
            status = 'Pending'
            break;
        case 2:
            status = 'Processing'
            break
        case 3: {
            status = 'Rejected'
            break;
        }
        case 4: {
            status = 'Active'
            break;
        }
        default:
            break;
    }

    if(loading){
        return <CardRestaurant/>
    }

    if (!loading && restaurant === undefined || restaurant === null || Object.keys(restaurant).length === 0) {
        return <div className='text-center py-4'>
            <h2 className='font-bold text-2xl mb-6'>No Restaurants Found</h2>
            <Link href={'/vendor/addRestaurant'} className='px-4 py-3 rounded-lg bg-gray-600 text-white font-bold m-2'>ADD A RESTAURANT</Link>
        </div>;
    }

    return (
        <>  
            <div className='w-full flex justify-between items-center bg-slate-700 p-3 rounded-md mb-4'>
                    <h1 className='font-bold text-white'>RESTAURANT DETAILS</h1>
            <div className='flex items-center justify-between'>
                <div className='flex gap-2 text-white'>
                    <button  onClick={pageMinus} disabled={page == 0}><BsFillArrowLeftSquareFill className="text-xl"/></button>
                    <p className='font-bold'>{page+1} / {allRestaurant.length}</p>
                    <button  onClick={pagePlus} disabled={page == allRestaurant.length-1}><BsFillArrowRightSquareFill className="text-xl"/></button>
                </div>
            </div>
            </div>
            <div className='p-5 bg-white shadow-sm'>
                <div className="flex flex-col items-start bg-white border border-gray-200 shadow md:flex-row">
                    <div style={{maxWidth:'47rem',maxHeight:'26rem'}} className='overflow-hidden flex justify-center items-center'>
                        <Image width={725} height={484} src={restaurant.banners ? restaurant.banners[0] : ''} alt='' />
                    </div>
                    <div className="flex flex-col justify-start h-full p-4 leading-normal w-full md:w-1/2">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">{restaurant.restaurantName}</h5>
                        <p className="mb-2 font-normal text-gray-800">{restaurant.landmark}, {restaurant.locality}</p>
                        <p className="mb-2 font-normal text-gray-800">₹{restaurant.minCost} for two</p>
                        <div className='flex items-center gap-1 mb-2'>
                            <GrMapLocation className="text-xl" />
                            <a href={restaurant.googlemapLocation} target="_blank"><p className='font-bold text-md text-blue-500'>View Location</p></a>
                        </div>
                        <p className='font-bold'>Time </p>
                        <p className='text-sm'>Opens at {restaurant.openingTime}</p>
                        <p className='mb-2 text-sm'>Closes at {restaurant.closingTime}</p>
                        <Link className='mb-8 py-2 px-3 bg-gray-500 w-1/2 flex items-center gap-2 text-white font-bold rounded-sm' href={`editRestaurant/${restaurant._id}`}><FaEdit/> Edit Restaurant</Link>

                        <h3 className='text-lg font-bold'>Status : {status}</h3>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <Link href={'/vendor/addRestaurant'} className='px-3 py-2 text-sm bg-slate-600 text-white font-bold rounded-md'>ADD NEW RESTAURANT</Link>
            </div>
        </>
    )
}

export default RestaurantCard
