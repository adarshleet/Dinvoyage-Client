'use client'
import { adminDashboard } from '@/apis/admin'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'


interface Graph{
    month:string,
    totalCompletedBookings:number
    restaurantCount:number
}

interface Counts{
    totalUsers:number
    totalVendors:number
    totalRestaurants:number
}

const AdminDashboard = () => {

    const [graph, setGraph] = useState([])
    const [counts,setCounts] = useState<Counts>()

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await adminDashboard()
                const data = res?.data.data
                console.log(data.revenueDetails)
                setGraph(data.revenueDetails)
                setCounts(data)
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const data = [
        {
            "month": "Jan",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Feb",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Mar",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Apr",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "May",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Jun",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Jul",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Aug",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Sep",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Oct",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Nov",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Dec",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        }
    ]

    graph.forEach((item:Graph) => {
        if (item.month) {
            const monthIndex = parseInt(item.month, 10)-1; // Adjust month index since arrays are zero-based
            if (!isNaN(monthIndex) && data[monthIndex]) {
                data[monthIndex]['Booking Revenue'] = Math.floor(item.totalCompletedBookings * 50);
                data[monthIndex]['Registering revenue'] = (item.restaurantCount * 2000) | 0;
            }
        }
    });

    return (
        <div className='py-5'>
            <div className='flex justify-between gap-5'>
                <div className='p-3 shadow-md border bg-white text-stone-500 hover:shadow-lg w-full flex items-center gap-2 flex-col'>
                    <div className='flex items-center gap-2'>
                        <h1 className='font-bold '>Total Users</h1>
                        {/* <M className='text-2xl text-stone-500' /> */}
                    </div>
                    <h1 className='font-bold text-xl'>{counts?.totalUsers}</h1>
                </div>
                <div className='p-3 shadow-md border bg-white text-red-500 hover:shadow-lg w-full flex items-center gap-2 flex-col'>
                    <div className='flex items-center gap-2'>
                        <h1 className=' font-bold text-base'>Total Vendors</h1>
                        {/* <TbCalendarCancel className="text-2xl text-red-500" /> */}
                    </div>
                    <h1 className='font-bold text-xl'>{counts?.totalVendors}</h1>
                </div>
                <div className='p-3 shadow-md bg-white text-emerald-400 border hover:shadow-lg w-full flex items-center gap-2 flex-col'>
                    <div className='flex items-center gap-2'>
                        <h1 className=' font-bold'>Total Restaurants</h1>
                        {/* <HiReceiptRefund className="text-emerald-400 text-2xl" /> */}
                    </div>
                    <h1 className='font-bold text-xl'>{counts?.totalRestaurants}</h1>
                </div>
            </div>
            <div className='my-10 py-8 bg-white'>
                <LineChart width={730} height={350} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Registering revenue" stroke="#8884d8" />
                    <Line type="monotone" dataKey="Booking Revenue" stroke="#82ca9d" />
                </LineChart>
            </div>
        </div>
    )
}

export default AdminDashboard
