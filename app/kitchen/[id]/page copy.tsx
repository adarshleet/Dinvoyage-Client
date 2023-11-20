'use client'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '../../components/user/navbar'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const page = () => {

    const[showItems,setShowItems] = useState('1')

    const handleItemClick = (index:string) => {
        setShowItems(index);
        console.log('Clicked item:', index);
    };

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
                            <img src="https://cff2.earth.com/uploads/2023/01/20101443/shutterstock_746261982-960x640.jpg" alt="" />
                        </div>
                        <div className='p-2 flex justify-between'>
                            <div>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 ">Paragon Restaurant</h5>
                                <p className="mb-2 font-normal text-gray-500">Near CH Bridge, Kozhikode</p>
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
                            <div className='flex gap-14 text-sm px-4 py-1'>
                                <p>Chicken biriyani</p>
                                <p>x2</p>
                                <p>₹350</p>
                            </div>
                            <div className='flex gap-14 text-sm px-4'>
                                <p>Chicken biriyani</p>
                                <p>x2</p>
                                <p>₹350</p>
                            </div>
                        </div>
                        <div className='py-3 border-b border-b-black pb-10'>
                            <div className='flex justify-between text-sm font-semibold px-4 py-1'>
                                <p>Item Total</p>
                                <p>₹350</p>
                            </div>
                            <div className='flex justify-between text-sm font-semibold px-4'>
                                <p>Reservation Charge</p>
                                <p>₹100</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between px-4 font-bold text-base py-2'>
                                <p>To Pay</p>
                                <p>₹450</p>
                            </div>
                        </div>
                        <button className='py-1 my-2 bg-cyan-800 w-full tex-sm text-white font-bold'>PROCEED TO PAYMENT</button>
                    </div>
                </div>
                <div className='my-16 py-4 bg-white'>
                    <h3 className='text-center font-bold text-xl'>SELECT YOUR TASTE</h3>
                    {['1', '2', '3'].map((index) => (
                        <div className='border-b-8 border-gray-200' key={index}>
                            <div className='py-2 px-2'>
                                <div className='text-lg font-bold px-3 flex justify-between items-center cursor-pointer' onClick={()=>handleItemClick(index)}>
                                    <h3>Classic Bowls (7)</h3>
                                    <h1 className='text-2xl'>{index == showItems ? <FiChevronUp/> : <FiChevronDown />}</h1>
                                </div>
                            </div>
                            <div className='px-4'>
                                {index == showItems && ['1', '2', '3'].map((item,innerIndex) => (
                                    <div className='pb-6 pt-3 border-b-2 mb-3' key={innerIndex+item}>
                                        <h5 className='text-lg font-semibold text-gray-800'>Paneer Tikka Mac & Cheese Pasta Bowl</h5>
                                        <p>₹279</p>
                                        <div className='mt-2 max-w-3xl'>
                                            <p className='text-sm text-gray-500 whitespace-normal'>Delicious Mac and Cheese got a tikka twist and we dont complain. Creamy Mac and Cheese in spicy mughlai gravy topped with soft paneer tikka and garnished with salad</p>
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
