'use client'
import React, { useEffect, useState } from 'react'
import { changeRestaurantStatus, singleRestaurantRequest } from '@/apis/admin'
import Link from 'next/link'
import Image from 'next/image'

interface requestProps {
    id: string
}

interface Restaurant{
    restaurantName:string
    status : number
    banners : string[]
    landmark:string
    locality:string
    minCost : number
    googlemapLocation : string
    openingTime :string
    closingTime :string
}

const RestaurantCard = ({ id }: requestProps) => {

    const [restaurant, setRestaurant] = useState<Restaurant>()
    const [dropDown,setDropDown] = useState(false)
    const [restaurantStatus,setStatus] = useState<string | number>('')



    useEffect(() => {
        const fetchData = async (id: string) => {
            const res = await singleRestaurantRequest(id)
            console.log(res?.data.data)
            const data = res?.data.data
            setRestaurant(data)
        }
        fetchData(id)
    }, [restaurantStatus,id])


    const changeStatus = async(status:number) =>{
        const res = await changeRestaurantStatus(id,status)
        console.log(res?.data.data)
        const data = res?.data.data.status
        setStatus(status)
        setDropDown(false)
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

    return (
        <div className='p-5 bg-white shadow-sm flex justify-center'>
            <div className="flex flex-col items-center bg-white border border-gray-200 shadow md:flex-row">
                <div className='overflow-hidden'>
                    <Image width={900} height={500} className="" src={restaurant?.banners ? restaurant.banners[0] : ''} alt='' />
                </div>
                <div className="flex flex-col justify-start h-full p-4 leading-normal w-full md:w-1/2">
                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">{restaurant?.restaurantName}</h5>
                    <p className="mb-2 font-normal text-gray-500">{restaurant?.landmark}, {restaurant?.locality}</p>
                    <p className="mb-2 font-normal text-gray-500">₹ {restaurant?.minCost} for two</p>
                    <a href={restaurant?.googlemapLocation} target="_blank"><p className='font-bold text-md text-blue-500 mb-1'>Restaurant Location</p></a>
                    <p className='font-bold'>Time </p>
                    <p>Opens at {restaurant?.openingTime}</p>
                    <p className='mb-2'>Closes at {restaurant?.closingTime}</p>
                    <h3 className='text-lg font-bold'>Status : {status}</h3>

                    <div className='mt-2'>
                        <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="text-white w-44 font-semibold bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                            type="button"
                            onClick={()=>setDropDown(!dropDown)}
                        >
                            Change Status{" "}
                            <svg
                                className="w-2.5 h-2.5 ml-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        {/* Dropdown menu */}
                        <div
                            id="dropdown"
                            className= {`z-10 ${!dropDown && 'hidden' } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 border border-gray-500`}
                        >
                            <ul
                                className="py-2 text-base text-gray-700 font-semibold"
                                aria-labelledby="dropdownDefaultButton"
                            >
                                <li>
                                    <button onClick={()=>changeStatus(2)}
                                        className="block px-4 py-2 hover:bg-gray-100 "
                                    >
                                        Processing
                                    </button>
                                </li>
                                <li>
                                    <button onClick={()=>changeStatus(3)}
                                        className="block px-4 py-2 hover:bg-gray-100 "
                                    >
                                        Rejected
                                    </button>
                                </li>
                                <li>
                                    <button onClick={()=>changeStatus(4)}
                                        className="block px-4 py-2 hover:bg-gray-100 "
                                    >
                                        Approve
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default RestaurantCard
