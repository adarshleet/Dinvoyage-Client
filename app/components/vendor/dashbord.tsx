'use client'
import React, { useEffect,useState } from 'react'
import { MdDateRange } from "react-icons/md";
import { TbCalendarCancel } from "react-icons/tb";
import { HiReceiptRefund } from "react-icons/hi2";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { salesChart, selectedCuisinesAndFacilities } from '@/apis/vendor';
import { FaUserCircle } from "react-icons/fa";
import Link from 'next/link';
import VendorLogout from '@/app/components/vendor/vendorLogout'
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs'

interface bar{
    month:string
    totalAmount : number
}

const Dashbord = () => {


    const [restaurant, setRestaurant] = useState<any>({})
    const [allRestaurant, setAllRestaurant] = useState<any>([])
    const [page, setPage] = useState(0)

    const [bars,setBars] = useState<bar[]>([])
    const [salesCount,setSalesCount] = useState(0)
    const [cancelledBookingCount,SetCancelledBookingCount] = useState(0)
    const [cancelledBookingAmount,setCancelledBookingAmount] = useState(0)



    useEffect(() => {
        try {
            const fetchData = async () => {
            const res = await selectedCuisinesAndFacilities();
            if(res?.data){
                const restaurantData = res.data.data;
                setAllRestaurant(restaurantData);
                setRestaurant(restaurantData[page])
                if(restaurantData[page]){
                    const response = await salesChart(restaurantData[page]._id)
                    const data = response?.data.data
                    setBars(data.sales)
                    setSalesCount(data.bookingCount)
                    setCancelledBookingAmount(data.cancelledBookingAmount)
                    SetCancelledBookingCount(data.cancelledBookingCount)
                }
            }

            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [page])


    const pageMinus = async () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
        if (allRestaurant[page - 1]) {
            setRestaurant(allRestaurant[page-1])
            const response = await salesChart(allRestaurant[page-1]._id)
            const data = response?.data.data
            setBars(data.sales)
            setSalesCount(data.bookingCount)
            setCancelledBookingAmount(data.cancelledBookingAmount)
            SetCancelledBookingCount(data.cancelledBookingCount)
        }
    };

    const pagePlus = async () => {
        setPage((prevPage) => Math.min(prevPage + 1, allRestaurant.length - 1));
        if (allRestaurant[page + 1]) {
            setRestaurant(allRestaurant[page+1])
            const response = await salesChart(allRestaurant[page+1]._id)
            const data = response?.data.data
            console.log(data)
            setBars(data.sales)
            setSalesCount(data.bookingCount)
            setCancelledBookingAmount(data.cancelledBookingAmount)
            SetCancelledBookingCount(data.cancelledBookingCount)

        }
    };


    


    let data = [
        {
            "month": "Jan",
            "sales": 0,
            "profit": 0        
        },
        {
            "month": "Feb",
            "sales": 0,
            "profit": 0
        },
        {
            "month": "Mar",
            "sales": 0,
            "profit": 0
        },
        {
            "month": "Apr",
            "sales": 0,
            "profit": 0
        },
        {
            "month": "May",
            "sales": 0,
            "profit": 0
        },
        {
            "month": "June",
            "sales": 0,
            "profit": 0
        },
        {
            "month": "July",
            "sales": 0,
            "profit": 0
        },
        {
            "month": "Aug",
            "sales": 0,
            "profit": 0
        },
        {
            "month": "Sep",
            "sales": 0,
            "profit": 0
        },
        {
            "month": "Oct",
            "sales": 0,
            "profit": 0
        },
        {
            "month": "Nov",
            "sales": 0,
            "profit": 0
        },
        {
            "month": "Dec",
            "sales": 0,
            "profit": 0
        }
    ]

    bars.forEach(item => {
        if (item.month) {
            const monthIndex = parseInt(item.month, 10)-1; // Adjust month index since arrays are zero-based
            if (!isNaN(monthIndex) && data[monthIndex] && item.totalAmount) {
                data[monthIndex].profit = Math.floor(item.totalAmount * (32 / 100));
                data[monthIndex].sales = item.totalAmount | 0;
            }
        }
    });
      
      console.log(data);

    

    return (
        <>
            <div className='border shadow bg-slate-700 p-4 flex justify-between rounded-md items-center relative w-full pb-10 mb-12'>
                <h3 className='font-bold text-lg text-white'>VENDOR DASHBOARD</h3>
                <div className='flex items-center gap-4'>
                    <Link href={'/vendor/profile'}><FaUserCircle className='text-3xl text-white' /></Link>
                    <VendorLogout />
                </div>
                <div className='flex justify-between items-center p-3 border shadow-md bg-white mb-2 absolute rounded-sm left-3 right-3 top-14'>
                    <div className=''>
                        <h4 className='text-xl text-gray-800 font-bold'>{restaurant?.restaurantName}</h4>
                        <h5 className='text-md text-gray-700 font-semibold'>{restaurant?.landmark}</h5>
                    </div>
                    <div className='flex gap-4 text-xl text-gray-600 font-bold'>
                        <button onClick={pageMinus} disabled={page === 0}><BsFillArrowLeftSquareFill /></button>
                        <h5>{page + 1}/{allRestaurant.length}</h5>
                        <button onClick={pagePlus} disabled={page === allRestaurant.length - 1}><BsFillArrowRightSquareFill /></button>
                    </div>
                </div>
            </div>
            <div className='py-5'>
                <div className='flex justify-between gap-5'>
                    <div className='p-3 shadow-md border bg-white text-stone-500 hover:shadow-lg w-full flex items-center gap-2 flex-col'>
                        <div className='flex items-center gap-2'>
                            <h1 className='font-bold '>Total Bookings</h1>
                            <MdDateRange className='text-2xl text-stone-500' />
                        </div>
                        <h1 className='font-bold text-xl'>{salesCount}</h1>
                    </div>
                    <div className='p-3 shadow-md border bg-white text-red-500 hover:shadow-lg w-full flex items-center gap-2 flex-col'>
                        <div className='flex items-center gap-2'>
                            <h1 className=' font-bold text-base'>Cancelled Bookings</h1>
                            <TbCalendarCancel className="text-2xl text-red-500" />
                        </div>
                        <h1 className='font-bold text-xl'>{cancelledBookingCount}</h1>
                    </div>
                    <div className='p-3 shadow-md bg-white text-emerald-400 border hover:shadow-lg w-full flex items-center gap-2 flex-col'>
                        <div className='flex items-center gap-2'>
                            <h1 className=' font-bold'>Refunds</h1>
                            <HiReceiptRefund className="text-emerald-400 text-2xl" />
                        </div>
                        <h1 className='font-bold text-xl'>₹ {cancelledBookingAmount}</h1>
                    </div>
                </div>
            </div>
            <div className='py-6 bg-white'>
                <BarChart width={730} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="profit" fill="#8884d8" />
                    <Bar dataKey="sales" fill="#82ca9d" /> 
                </BarChart>
            </div>
        </>
    )
}

export default Dashbord
