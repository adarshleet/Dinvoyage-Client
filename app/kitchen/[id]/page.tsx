'use client'
import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '../../components/user/navbar'
import { FiChevronDown, FiChevronUp, FiPlus, FiMinus } from "react-icons/fi";
import { kitchenItems, payment, singleRestaurant } from '@/apis/user';

import { loadStripe } from '@stripe/stripe-js';

import { useRouter } from 'next/navigation';


interface restaurantProps {
    params:{
        id:string
    }
}

const page = ({ params }: restaurantProps) => {

    const [showItems, setShowItems] = useState('1')
    const [selectedItems, setSelectedItems] = useState([]);

    const [restaurant, setRestaurant] = useState({})
    const [allItems, setAllItems] = useState([])
    const [guestDetails, setGuestDetails] = useState({})


    const { id } = params

    const router = useRouter()


    useEffect(() => {
        const fetchData = async () => {
            const res = await singleRestaurant(id)
            const restaurant = res?.data.data
            setRestaurant(restaurant)
            const response = await kitchenItems(id)
            const items = response?.data.kitchenAllItems.data
            setAllItems(items)
            const guestDetails = response?.data?.sessionData?.bookingDetails
            console.log('ferr', guestDetails)
            if (guestDetails.items) {
                setSelectedItems(guestDetails.items)
            }
            if (!guestDetails) {
                return router.push('/login')
            }
            setGuestDetails(guestDetails)
        }
        fetchData()
    }, [])


    const handleItemClick = (index: string) => {
        setShowItems(index);
        console.log('Clicked item:', index);
    };


    const handleCounterChange = (category: string, item: string, count: number, price: number) => {
        const updatedItems = [...selectedItems];
        const existingItemIndex = updatedItems.findIndex((i) => i.category === category && i.item === item);
        console.log(existingItemIndex)

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


    //convert date
    // const dateString = "2023-11-23T18:30:00.000Z";
    const dateObject = new Date(guestDetails.date);

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);

    console.log(formattedDate);



    //payment working
    const makePayment = async () => {
        try {

            const bookingDetails = {
                ...guestDetails,
                items: selectedItems,
                totalAmount: subTotal + 100
            }
            console.log(bookingDetails)

            const stripe = await loadStripe('pk_test_51OEOTHSFAVCVwY62lVqaB5GwF666YpNTLBjIF8KibE3yclRVMS2yiPxXYg4nit60L2bhvrXqY1DREUdI3EvYsVvY00WM1EwgTk');
            const res = await payment(bookingDetails)
            const sessionId = res?.data.data

            const result = stripe?.redirectToCheckout({
                sessionId: sessionId
            })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Toaster position='bottom-center' />
            <header>
                <Navbar />
            </header>
            <main className='flex flex-col items-center py-24 px-4'>
                <div className='flex flex-col md:flex-row justify-center gap-3'>
                    <div className='bg-white md:w-1/2'>
                        <div className='' style={{ maxWidth: '28rem' }}>
                            <img src={restaurant.banners} alt="" />
                        </div>
                        <div className='p-2 flex justify-between'>
                            <div>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 ">{restaurant.restaurantName}</h5>
                                <p className="mb-2 text-sm font-normal text-gray-500">{restaurant.landmark}, {restaurant.locality}</p>
                            </div>
                            <div>
                                <h2 className='font-bold text-lg'>Booking Details</h2>
                                <h5 className='font-semibold text-sm'>Date : {formattedDate}</h5>
                                <h5 className='font-semibold text-sm'>Time : {guestDetails.time}</h5>
                                <h5 className='font-semibold text-sm'>Guests : {guestDetails.guestCount}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white px-8 py-6' style={{ minWidth: '25rem' }}>
                        <div className='border-b py-4'>
                            {selectedItems.length == 0 ?
                                <h1 className='text-center'>Select the items from the menu</h1>
                                :
                                selectedItems.map((selected, index) => (
                                    <div className='flex justify-between text-sm px-4 py-1' key={index}>
                                        <p>{selected?.item}</p>
                                        <p className='text-center'>x{selected?.count}</p>
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
                                <p>₹{subTotal + 100}</p>
                            </div>
                        </div>
                        <button className='py-1 my-2 bg-cyan-800 w-full tex-sm text-white font-bold' disabled={selectedItems.length == 0} onClick={makePayment}>PROCEED TO PAYMENT</button>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='my-16 py-4 bg-white w-full'>
                        <h3 className='text-center font-bold text-xl px-36 md:px-80'>SELECT YOUR TASTE</h3>
                        {allItems.map((item, index) => (
                            <div className='border-b-8 border-gray-200' key={index}>
                                <div className='py-2 px-2'>
                                    <div className='text-lg font-bold px-2 flex justify-between items-center cursor-pointer' onClick={() => handleItemClick(index)}>
                                        <h3 className='capitalize'>{item?.category} ({item?.items.length})</h3>
                                        <h1 className='text-2xl'>{index == showItems ? <FiChevronUp /> : <FiChevronDown />}</h1>
                                    </div>
                                </div>
                                <div className='px-4'>
                                    {index == showItems && item.items.map((item, innerIndex) => (
                                        <div className='pb-6 pt-3 border-b-2 mb-3 flex justify-between' key={innerIndex + item}>
                                            <div>
                                                <h5 className='text-base font-semibold text-gray-800'>{item.itemName}</h5>
                                                <p>₹{item.price}</p>
                                                <div className='mt-2 max-w-3xl'>
                                                    <p className='text-sm text-gray-500 whitespace-normal'>{item.description}</p>
                                                </div>
                                            </div>
                                            <div className='flex items-center shadow-md border h-full py-1'>
                                                {!selectedItems.find((i) => i.category === index && i.item === item.itemName)?.count ?
                                                    <button className='px-7 font-bold text-orange-600' onClick={() => handleCounterChange(index, item.itemName, (selectedItems.find((i) => i.category === index && i.item === item.itemName)?.count || 0) + 1, item.price)}>Add</button>
                                                    :
                                                    <>
                                                        <button
                                                            className='px-2 py-1 text-gray-800 rounded'
                                                            onClick={() => handleCounterChange(index, item.itemName, Math.max((selectedItems.find((i) => i.category === index && i.item === item.itemName)?.count || 0) - 1, 0), item.price)}
                                                        >
                                                            <FiMinus />
                                                        </button>
                                                        <h1><span className='mx-2 text-orange-600 font-bold'>{selectedItems.find((i) => i.category === index && i.item === item.itemName)?.count || 0}</span></h1>
                                                        <button
                                                            className='px-2 py-1 text-gray-800 rounded'
                                                            onClick={() => handleCounterChange(index, item.itemName, (selectedItems.find((i) => i.category === index && i.item === item.itemName)?.count || 0) + 1, item.price)}
                                                        >
                                                            <FiPlus />
                                                        </button>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default page
