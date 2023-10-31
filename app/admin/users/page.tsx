'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '@/app/components/admin/sidebar'
import { allUsers } from '@/apis/admin'
import { blockUser } from '@/apis/admin'

interface User {
    _id: string,
    name: string,
    mobile?: string,
    email?: string,
    isBlocked: boolean
}

const page = () => {

    let [users, setUsers] = useState<User[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await allUsers()
            console.log(res?.data)
            setUsers(res?.data)
        }
        fetchUsers()
    }, [])



    const changeStatus = async (id: string) => {
        try {
            const res = await blockUser(id)
            setUsers(prevUsers => prevUsers.map(user => {
                if (user._id === id) {
                    return { ...user, isBlocked: !user.isBlocked };
                }
                return user;
            }));
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    users = users.filter(user =>
        user.name.toLowerCase().startsWith(search.toLowerCase()) ||
        user.mobile?.startsWith(search)
    );

    return (
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar />
            </div>
            <div className='px-6 md:pl-6 md:pr-10 '>
                <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                    <h1 className='font-bold text-white'>ALL USERS</h1>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-md my-4">
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
                                value={search}
                                onChange={handleSearch}
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search for users"
                            />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-s text-gray-700 uppercase bg-gray-50 ">
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
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length ? (
                                users.map((user, index) => (
                                    <tr className="bg-white border-b text-s" key={index}>
                                        <td className="flex items-center px-6 py-4 whitespace-nowrap">
                                            <div className="">
                                                <div className="font-semibold text-gray-500">
                                                    {user.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className='flex items-center font-semibold'>
                                                {user.mobile}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center font-semibold">
                                                {user.email ? user.email : '-not added-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center font-semibold">
                                                {user.isBlocked ? 'Blocked' : 'Active'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => changeStatus(user._id)}
                                                className={`p-2 font-bold text-white rounded-sm ${user.isBlocked ? 'bg-red-500' : 'bg-red-700'}`}
                                            >
                                                {user.isBlocked ? 'UNBLOCK' : 'BLOCK'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>
                                        <p>Loading....</p>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col items-center">
                    {/* Help text */}
                    <span className="text-sm text-gray-700 self-start">
                        Showing{" "}
                        <span className="font-semibold text-gray-900 ">10</span> out of{" "}
                        <span className="font-semibold text-gray-900 ">100</span>{" "}
                        Entries
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0 self-start">
                        {/* Buttons */}
                        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-900 bg-gray-300 rounded-l">
                            <svg
                                className="w-3.5 h-3.5 mr-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 5H1m0 0 4 4M1 5l4-4"
                                />
                            </svg>
                            Prev
                        </button>
                        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-900 bg-gray-300 border-0 border-l border-gray-700 rounded-r">
                            Next
                            <svg
                                className="w-3.5 h-3.5 ml-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default page
