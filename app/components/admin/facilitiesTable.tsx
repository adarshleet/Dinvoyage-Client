'use client'
import { allFacilities } from '@/apis/admin';
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'



interface Data {
    _id: string;
    facilities: string[];
}

const FacilitiesTable = () => {
    const [data, setData] = useState<Data[]>([])
    // const {isLoading,data,refetch} = useQuery({queryKey:['facilities'],queryFn:allFacilities})
    // if(!isLoading){
    //     console.log(data?.data)
    // }

    useEffect(() => {
        const fetchData = async () => {
            const res = await allFacilities()
            console.log(res?.data)
            setData(res?.data)
        }
        fetchData()
    }, [])




    return (
        <div className="relative overflow-x-auto w-1/2">
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Facilities
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map((data, index) => (
                        <tr className="bg-white" key={index}>
                            <td
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                                {data}
                            </td>
                            <td className="px-6 py-4">
                                <button className='bg-green-600 text-white py-1 px-2 rounded-sm font-bold mx-1'>Edit</button>
                                <button className='bg-red-800 text-white py-1 px-2 rounded-sm font-bold'>Delete</button>
                            </td>
                        </tr>
                    )) :
                        <h1>no data</h1>
                    }

                </tbody>
            </table>
            <button className='bg-cyan-800 px-2 rounded-sm text-white py-1 my-1 font-bold'>Add facility</button>
        </div>
    )
}

export default FacilitiesTable



