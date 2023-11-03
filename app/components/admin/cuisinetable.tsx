'use client'
import { allCuisines } from '@/apis/admin'
import React, { useEffect, useState } from 'react'


interface Data{
    cuisines:Array<string>
}
const CuisineTable = () => {
    const [cuisines,setCuisines] = useState<Data[]>([])

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await allCuisines()
            console.log(res)
            setCuisines(res?.data)
        }
        fetchData()
    },[])


    return (
        <div className="relative overflow-x-auto w-1/2">
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Cuisines
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cuisines.map((cuisine,index)=>(
                        <tr className="bg-white" key={index}>
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                            {cuisine}
                        </th>
                        <td className="px-6 py-4">
                            <button className='bg-green-600 text-white py-1 px-2 rounded-sm font-bold mx-1'>Edit</button>
                            <button className='bg-red-800 text-white py-1 px-2 rounded-sm font-bold'>Delete</button>
                        </td>
                    </tr>
                    ))
                    }
                </tbody>

            </table>
            <button className='bg-cyan-800 px-2 rounded-sm text-white py-1 my-1 font-bold'>Add Cuisine</button>

        </div>
    )
}

export default CuisineTable
