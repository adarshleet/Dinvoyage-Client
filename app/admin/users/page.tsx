import React from 'react'
import Sidebar from '@/app/components/admin/sidebar'

const page = () => {
    return (
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar />
            </div>
            <div className='px-6 md:pl-6 md:pr-10 '>
                <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                    <h1 className='font-bold text-white'>ALL USERS</h1>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-md">
                    <div className="flex items-center justify-between pb-4 p-2 bg-white">
                        <label htmlFor="table-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search-users"
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search for users"
                            />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mobile
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b">
                                <td
                                    className="flex items-center px-6 py-4 whitespace-nowrap "
                                >
                                    <div className="">
                                        <div className="font-normal text-gray-500">
                                            neil.sims@flowbite.com
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className='flex items-center'>
                                        React Developer
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                                        Online
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit user
                                    </a>
                                </td>
                            </tr>
                            
                            
                            
                            
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default page
