import React from 'react'
import logo from '../../../public/dineVoyageLogo.png'
import Image from 'next/image'
import {BiSolidDashboard,BiSolidMessageAltError,BiSolidOffer} from 'react-icons/bi'
import {AiFillShop} from 'react-icons/ai'
import {FaUsers} from 'react-icons/fa'
import {MdStyle} from 'react-icons/md'
import {TbTableOptions} from 'react-icons/tb'
import Link from 'next/link'

interface Page{
    page : string
}
const Sidebar = ({page}:Page) => {
  return (
    <>
            <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    />
                </svg>
            </button>
            <aside
                id="logo-sidebar"
                className="md:block fixed hidden top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                    <Link href="/admin/dashboard" className="flex flex-col items-center p-3 mb-5">
                        <Image
                            src={logo}
                            className=""
                            alt="DineVoyage"
                            width={150}
                        />
                        <span className="self-center text-xl whitespace-nowra font-bold">
                            ADMIN
                        </span>
                    </Link>
                    <ul className="space-y-2 font-medium">
                        <li  className={page=='dashboard' ? 'bg-gray-500 font-bold text-white rounded-lg' : 'text-gray-900 hover:bg-gray-100'}>
                            <Link
                                href="/admin/dashboard"
                                className="flex items-center p-3  rounded-lg    group"
                            >
                                <BiSolidDashboard className="text-2xl"/>
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>

                        <li  className={page=='users' ? 'bg-gray-500 font-bold text-white rounded-lg' : 'text-gray-900 hover:bg-gray-100'}>
                            <Link
                                href="/admin/users"
                                className="flex items-center p-3  rounded-lg  group"
                            >
                                <FaUsers className="text-2xl"/>
                                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                            </Link>
                        </li>

                        <li className={page=='vendors' ? 'bg-gray-500 font-bold text-white rounded-lg' : 'text-gray-900 hover:bg-gray-100'}>
                            <Link
                                href="/admin/vendors"
                                className="flex items-center p-3 rounded-lg  group"
                            >
                                <AiFillShop className="text-2xl"/>
                                <span className="ml-3">Vendors</span>
                            </Link>
                        </li>
                        
                        <li className={page=='request' ? 'bg-gray-500 font-bold text-white rounded-lg' : 'text-gray-900 hover:bg-gray-100'}>
                            <Link
                                href="/admin/requests"
                                className="flex items-center p-3  rounded-lg  group"
                            >
                                <BiSolidMessageAltError className="text-2xl" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Requests</span>
                                {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">
                                    3
                                </span> */}
                            </Link>
                        </li>

                        <li  className={page=='cuisines' ? 'bg-gray-500 font-bold text-white rounded-lg' : 'text-gray-900 hover:bg-gray-100'}>
                            <Link
                                href="/admin/cuisines"
                                className="flex items-center p-3 rounded-lg  group"
                            >
                                <TbTableOptions className="text-2xl" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Cuisines & Facilties</span>
                            
                            </Link>
                        </li>
                       
                        <li>
                            <Link
                                href="#"
                                className="flex items-center justify-center p-3 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <MdStyle className="text-2xl" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Banners</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <BiSolidOffer className="text-2xl"/>
                                <span className="flex-1 ml-3 whitespace-nowrap">Offers</span>
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </aside>
           
        </>
  )
}

export default Sidebar
