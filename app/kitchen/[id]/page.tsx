'use client'
import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '../../components/user/navbar'
import { FiChevronDown, FiChevronUp, FiPlus, FiMinus } from "react-icons/fi";
import { kitchenItems, singleRestaurant } from '@/apis/user';


interface restaurantProps {
    params: string
}

const page = ({ params }: restaurantProps) => {

    const [showItems, setShowItems] = useState('1')
    const [selectedItems, setSelectedItems] = useState([]);

    const [restaurant, setRestaurant] = useState({})
    const [allItems, setAllItems] = useState([])

    console.log(selectedItems)

    const { id } = params


    useEffect(() => {
        const fetchData = async () => {
            const res = await singleRestaurant(id)
            const restaurant = res?.data.data
            setRestaurant(restaurant)
            const response = await kitchenItems(id)
            const items = response?.data.data
            console.log(items)
            setAllItems(items)
        }
        fetchData()
    }, [])


    const handleItemClick = (index: string) => {
        setShowItems(index);
        console.log('Clicked item:', index);
    };


    const handleCounterChange = (category: string, item: object, count: number, price: number) => {
        const updatedItems = [...selectedItems];
        const existingItemIndex = updatedItems.findIndex((i) => i.category === category && i.item === item);

        if (existingItemIndex !== -1) {
            if (count === 0) {
                updatedItems.splice(existingItemIndex, 1); // Remove item if count is 0
            } else {
                updatedItems[existingItemIndex] = { category, item, count, price };
            }
        } else if (count > 0) {
            updatedItems.push({ category, item, count, price });
        }

        setSelectedItems(updatedItems);
    };

    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, item) => total + item.count * item.price, 0);
    };
    const subTotal = calculateTotalPrice()


    return (
        <>
            <Toaster position='bottom-center' />
            <header>
                <Navbar />
            </header>
            <main className='flex flex-col items-center py-24 px-4'>
                <div className='flex flex-col md:flex-row justify-center gap-3'>
                    <div className='bg-white md:w-1/2'>
                        <div className='' style={{ maxWidth: '30rem' }}>
                            <img src={restaurant.banners} alt="" />
                        </div>
                        <div className='p-2 flex justify-between'>
                            <div>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 ">{restaurant.restaurantName}</h5>
                                <p className="mb-2 text-sm font-normal text-gray-500">{restaurant.landmark}, {restaurant.locality}</p>
                            </div>
                            <div>
                                <h2 className='font-bold text-lg'>Booking Details</h2>
                                <h5 className='font-semibold text-sm'>Date : 12 Dec 2023</h5>
                                <h5 className='font-semibold text-sm'>Time : 6:00 PM</h5>
                                <h5 className='font-semibold text-sm'>Guests : 2</h5>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white px-8 py-6'>
                        <div className='border-b py-4'>
                            {selectedItems.map((selected,index) => (
                                <div className='flex gap-14 text-sm px-4 py-1' key={index}>
                                    <p>{selected?.item.itemName}</p>
                                    <p>x{selected?.count}</p>
                                    <p>₹{selected?.count * selected?.price}</p>
                                </div>
                            ))}
                        </div>
                        <div className='py-3 border-b border-b-black pb-10'>
                            <div className='flex justify-between text-sm font-semibold px-4 py-1'>
                                <p>Item Total</p>
                                <p>₹{subTotal}</p>
                            </div>
                            <div className='flex justify-between text-sm font-semibold px-4'>
                                <p>Reservation Charge</p>
                                <p>₹100</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between px-4 font-bold text-base py-2'>
                                <p>To Pay</p>
                                <p>₹{subTotal+100}</p>
                            </div>
                        </div>
                        <button className='py-1 my-2 bg-cyan-800 w-full tex-sm text-white font-bold'>PROCEED TO PAYMENT</button>
                    </div>
                </div>
                <div className='my-16 py-4 bg-white' style={{ minWidth: '50rem' }}>
                    <h3 className='text-center font-bold text-xl'>SELECT YOUR TASTE</h3>
                    {allItems.map((item, index) => (
                        <div className='border-b-8 border-gray-200' key={index}>
                            <div className='py-2 px-2'>
                                <div className='text-lg font-bold px-3 flex justify-between items-center cursor-pointer' onClick={() => handleItemClick(index)}>
                                    <h3 className='capitalize'>{item?.category} ({item?.items.length})</h3>
                                    <h1 className='text-2xl'>{index == showItems ? <FiChevronUp /> : <FiChevronDown />}</h1>
                                </div>
                            </div>
                            <div className='px-4'>
                                {index == showItems && item.items.map((item, innerIndex) => (
                                    <div className='pb-6 pt-3 border-b-2 mb-3' key={innerIndex + item}>
                                        <h5 className='text-lg font-semibold text-gray-800'>{item.itemName}</h5>
                                        <p>₹{item.price}</p>
                                        <div className='flex items-center'>
                                            <button
                                                className='mr-2 px-2 py-1 bg-cyan-800 text-white rounded'
                                                onClick={() => handleCounterChange(index, item, (selectedItems.find((i) => i.category === index && i.item === item)?.count || 0) + 1, item.price)}
                                            >
                                                <FiPlus />
                                            </button>
                                            <h1><span className='mr-2'>{selectedItems.find((i) => i.category === index && i.item === item)?.count || 0}</span></h1>
                                            <button
                                                className='px-2 py-1 bg-red-600 text-white rounded'
                                                onClick={() => handleCounterChange(index, item, Math.max((selectedItems.find((i) => i.category === index && i.item === item)?.count || 0) - 1, 0), item.price)}
                                            >
                                                <FiMinus />
                                            </button>
                                        </div>
                                        <div className='mt-2 max-w-3xl'>
                                            <p className='text-sm text-gray-500 whitespace-normal'>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>))}
                </div>
            </main>
        </>
    )
}

export default page
