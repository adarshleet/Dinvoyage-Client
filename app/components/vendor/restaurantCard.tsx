'use client'
import { getRestaurant } from '@/apis/vendor'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const RestaurantCard = () => {
    const [restaurant,setRestaurant] = useState<any>({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getRestaurant();
                if (res?.data) {
                    console.log(res.data.data[0]);
                    const restaurantData = res.data.data[0];
                    setRestaurant(restaurantData);
                }
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        };
        fetchData();
    }, []);

    let status
    switch (restaurant?.status) {
        case 1:
            status = 'Pending'
            break;
        case 2:
            status = 'Processing'
            break
        case 3:{
            status = 'Rejected'
            break;
        }
        case 4:{
            status = 'Active'
            break;
        }
        default:
            break;
    }

    if (restaurant === undefined || restaurant === null || Object.keys(restaurant).length === 0) {
        return  <div className='text-center'>
                    <h2 className='font-bold text-lg mb-3'>No restaurants found</h2>
                    <Link href={'/vendor/addRestaurant'} className='px-4 py-3 rounded-lg bg-gray-600 text-white font-bold m-2'>Add restaurant</Link>
                </div>;
    }

    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 shadow md:flex-row">
            <div>
                <img className="" src={restaurant.banners ? restaurant.banners[0] : ''} alt='' />
            </div>
            <div className="flex flex-col justify-start h-full p-4 leading-normal w-full md:w-1/2">
                <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">{restaurant.restaurantName}</h5>
                <p className="mb-2 font-normal text-gray-500">{restaurant.landmark}, {restaurant.locality}</p>
                <p className="mb-2 font-normal text-gray-500">{restaurant.minCost} for two</p>
                <a href={restaurant.googlemapLocation} target="_blank"><p className='font-bold text-md text-blue-500 mb-1'><i className="fa-solid fa-location-arrow"></i> Location</p></a>
                <p className='font-bold'>Time </p>
                <p>Opens at {restaurant.openingTime}</p>
                <p className='mb-8'>Closes at {restaurant.closingTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                <h3 className='text-lg font-bold'>Status : {status}</h3>
                {/* <button className="py-2 text-white font-bold" style={{ backgroundColor: '#247F9E' }}>BOOK A TABLE</button> */}
            </div>
        </div>
    )
}

export default RestaurantCard
