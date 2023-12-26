'use client'
import React, { useState, useEffect } from 'react'
import { allUsers, allVendors, blockVendor } from '@/apis/admin'
import { blockUser } from '@/apis/admin'
import { HiArrowNarrowRight, HiArrowNarrowLeft } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import ConfirmPopUp from './confirmPopUp'
import TableSkeleton from '../loadingPages/tableLoading'


interface Data {
    _id: string,
    name: string,
    mobile?: string,
    email?: string,
    isBlocked: boolean
}

interface tableProps {
    user: boolean,
}
const Table = ({ user }: tableProps) => {

    let [data, setData] = useState<Data[]>([])
    const [search, setSearch] = useState('')
    const [pagination, setPagination] = useState({
        totalPages: 0,
        totalData: 0,
        limit: 5
    });
    const [confirmPopUp,setConfirmPopUp] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const [dataId,setDataId] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async (currentPage: number) => {
            try {
                let res;
                if (user) {
                    res = await allUsers(currentPage);
                } else {
                    res = await allVendors(currentPage);
                }
                if (res && res.data) {
                    const { allUsers, allVendors, totalPages, totalData, limit } = res.data;
                    setData(user ? allUsers : allVendors);
                    setPagination({ totalPages, totalData, limit });
                    setIsLoading(false)
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchData(currentPage)
    }, [currentPage,user])


    const blockButton = (id:string)=>{
        setConfirmPopUp(true)
        setDataId(id)
    }

    const onCloseModel = ()=>{
        setConfirmPopUp(false)
    }


    const pageIncrement = () => {
        try {
            setCurrentPage(currentPage + 1)
        } catch (error) {
            console.log(error)
        }
    }

    const pageDecrement = () => {
        try {
            setCurrentPage(currentPage - 1)
        } catch (error) {
            console.log(error)
        }
    }



    const changeStatus = async (id: string):Promise<void> => {
        try {
            if (user) {
                const res = await blockUser(id);
                setData(prevUsers => prevUsers.map(currentUser => {
                    if (currentUser._id === id) {
                        return { ...currentUser, isBlocked: !currentUser.isBlocked };
                    }
                    return currentUser;
                }));
            } else {
                const res = await blockVendor(id);
                setData(prevVendors => prevVendors.map(currentVendor => {
                    if (currentVendor._id === id) {
                        return { ...currentVendor, isBlocked: !currentVendor.isBlocked };
                    }
                    return currentVendor;
                }));
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    data = data.filter(item =>
        item.name.toLowerCase().startsWith(search.toLowerCase()) ||
        item.mobile?.startsWith(search)
    );

    return (
        <>
        <div className='px-6 md:pl-6 md:pr-10'>
            <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                <h1 className='font-bold text-white'>{user ? 'ALL USERS' : 'ALL VENDORS'}</h1>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-md my-4">
                <div className="flex items-center justify-between pb-4 p-2 bg-white">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <AiOutlineSearch />
                        </div>
                        <input
                            type="text"
                            id="table-search-users"
                            value={search}
                            onChange={handleSearch}
                            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={user ? "Search for users" : "Search for vendors"}
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
                        {isLoading ? (
                            <TableSkeleton/>
                        ):

                        
                        data.length ? (
                            data.map((item, index) => (
                                <tr className="bg-white border-b text-s" key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="font-semibold text-gray-500">
                                                {item.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className='flex items-center font-semibold'>
                                            {item.mobile ? item.mobile : '-not added-'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center font-semibold">
                                            {item.email ? item.email : '-not added-'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center font-semibold">
                                            {item.isBlocked ? 'Blocked' : 'Active'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            // onClick={() => changeStatus(item._id)}
                                            onClick={()=>blockButton(item._id)}
                                            className={`p-2 font-bold text-white rounded-sm ${item.isBlocked ? 'bg-red-500' : 'bg-red-700'}`}
                                        >
                                            {item.isBlocked ? 'UNBLOCK' : 'BLOCK'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <div className='py-5'>
                                <p className='text-center text-lg font-bold'>No Users Found</p>
                            </div>
                        )}

                    </tbody>
                </table>
            </div>
            
            <div className="flex flex-col items-center">
                {/* Help text */}
                <span className="text-sm text-gray-700 self-start">
                    Showing{" "}
                    <span className="font-semibold text-gray-900 ">{data.length}</span> out of{" "}
                    <span className="font-semibold text-gray-900 ">{pagination.totalData}</span>{" "}
                    Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0 self-start">
                    {/* Buttons */}
                    <button onClick={pageDecrement} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-900 bg-gray-300 rounded-l" disabled={currentPage === 1}>

                        <HiArrowNarrowLeft className="text-xl mr-1" />
                        Prev
                    </button>
                    <div className='bg-gray-300 px-3 flex justify-center items-center border-x border-1'>
                        {currentPage}
                    </div>
                    <button onClick={pageIncrement} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-900 bg-gray-300  border-gray-700 rounded-r" disabled={currentPage === pagination.totalPages}>
                        Next
                        <HiArrowNarrowRight className="text-xl ml-1" />
                    </button>
                </div>
            </div> 
        </div>
        <ConfirmPopUp confirmPopUp={confirmPopUp} changeStatus={changeStatus} id={dataId} onCloseModel={onCloseModel}/>
        </>
    )
}

export default Table
