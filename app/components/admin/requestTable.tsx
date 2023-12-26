'use client'
import { restaurantRequests } from '@/apis/admin'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface Request {
    _id: string;
    vendorId: {
      name: string;
    };
    restaurantName: string;
    locality: string;
    status: number;
  }

const RequestTable = () => {

    let [requests,setRequests] = useState([])

    useEffect(()=>{
        const fetchData = async() =>{
            const res = await restaurantRequests()
            const data = res?.data.data
            console.log(data)
            setRequests(data)
        }
        fetchData()
    },[])

    const getStatus = (status:number) => {
        switch (status) {
          case 1:
            return 'Pending';
          case 2:
            return 'Processing';
          case 3:
            return 'Rejected';
          case 4:
            return 'Approved';
          default:
            return 'Unknown';
        }
    };

    return (
        <>
        <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                <h1 className='font-bold text-white'>ALL RESTAURANT REQUESTS</h1>
            </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-lg text-gray-700 uppercase bg-gray-200 ">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-sm">
                            Vendor Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm">
                            Restaurant Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request:Request,index)=>(
                    <tr className="bg-white border-b" key={index}>
                        <td
                            scope="row"
                            className="px-6 py-4 text-base text-gray-900 whitespace-nowrap "
                        >
                            {request.vendorId.name}
                        </td>
                        <td className="px-6 py-4 text-base text-gray-900 whitespace-nowrap ">{request.restaurantName}</td>
                        <td className="px-6 py-4 text-base text-gray-900 whitespace-nowrap ">{request.locality}</td>
                        <td className="px-6 py-4 text-base text-gray-900 whitespace-nowrap ">{getStatus(request.status)}</td>
                        <td className="px-6 py-4 text-base text-gray-900 whitespace-nowrap ">
                            <Link href={`/admin/request/${request._id}`} className='py-2 px-3 bg-gray-600 text-white font-bold rounded-md'>View</Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default RequestTable
