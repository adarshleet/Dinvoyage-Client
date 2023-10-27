import React from 'react'
import Navbar from '../components/user/navbar'
import HotelCard from '../components/user/hotelCard'

function page() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <div className='flex justify-center py-10 px-6'>
                    <div className='flex justify-center gap-4'>
                        <div className='w-60 hidden md:block'>
                            <div>
                                <button
                                    id="dropdownBgHoverButton"
                                    data-dropdown-toggle="dropdownBgHover"
                                    className="text-gray-500 font-bold bg-white w-full focus:outline-none rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center"
                                    type="button"
                                >
                                    Cuisines

                                </button>

                                {/* Dropdown menu */}
                                <div id="dropdownBgHover" className="z-10 w-full bg-white rounded-sm shadow">
                                    <ul className="pt-0 p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownBgHoverButton">
                                        <li>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-200">
                                                <input
                                                    id="checkbox-item-4"
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounde"
                                                />
                                                <label
                                                    htmlFor="checkbox-item-4"
                                                    className="w-full ml-2 text-sm font-medium text-gray-700 rounded"
                                                >
                                                    Kerala
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-200">
                                                <input
                                                    id="checkbox-item-5"
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounde"
                                                />
                                                <label
                                                    htmlFor="checkbox-item-5"
                                                    className="w-full ml-2 text-sm font-medium text-gray-700 rounded"
                                                >
                                                    Continental
                                                </label>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className='font-bold text-lg'>Best Restaurants Near In Kozhikode</h1>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                                <HotelCard />
                                <HotelCard />
                                <HotelCard />
                                <HotelCard />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default page
