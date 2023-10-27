import React from 'react'
import Navbar from '../components/user/navbar'
import RestaurantCard from '../components/user/restaurantCard'


const page = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='flex justify-center py-16 px-4'>
                <div>
                    <RestaurantCard />
                    <div className='bg-white my-6 shadow flex'>
                        <div className='hover:border-b-4 hover:pb-1 hover:text-orange-500 border-orange-500 py-2 px-6'>
                            <h3 className='font-bold'>Menu</h3>
                        </div>
                        <div className='hover:border-b-4 hover:pb-1 hover:text-orange-500 border-orange-500 py-2 px-6'>
                            <h3 className='font-bold'>About</h3>
                        </div>
                        <div className='hover:border-b-4 hover:pb-1 hover:text-orange-500 border-orange-500 py-2 px-6'>
                            <h3 className='font-bold'>Reviews</h3>
                        </div>
                        <div className='hover:border-b-4 hover:pb-1 hover:text-orange-500 border-orange-500 py-2 px-6'>
                            <h3 className='font-bold'>Help</h3>
                        </div>
                    </div>
                    <div className='bg-white shadow p-3 mb-6'>
                        <h3 className='font-bold mb-1'>Menu</h3>
                        <div className="w-28 h-28 overflow-hidden">
                            <img src="https://b.zmtcdn.com/data/menus/533/900533/56c75b3e0de767c159c3b97994b98be0.jpg" alt="" />
                        </div>
                    </div>
                    <div className='bg-white shadow p-3 mb-6'>
                        <h3 className='font-bold mb-4'>About</h3>
                        <div>
                            <div className='flex items-start mb-3'>
                                <div className='bg-cyan-600 px-2 py-1.5 mr-2 rounded-full'>
                                    <i className="fa-solid fa-utensils text-lg text-white m-1"></i>
                                </div>
                                <div>
                                    <h4 className='text-cyan-600 font-bold'>CUISINES</h4>
                                    <div>
                                        <p>Kerala , Continental</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-start mb-3'>
                                <div className='bg-cyan-600 px-2.5 py-1.5 mr-2 rounded-full'>
                                    <i className="fa-solid fa-indian-rupee-sign text-lg text-white m-1"></i>
                                </div>
                                <div>
                                    <h4 className='text-cyan-600 font-bold'>AVERAGE COST</h4>
                                    <div>
                                        <p>₹500 for two people</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='flex items-start'>
                                    <div className='bg-cyan-600 px-1.5 py-1.5 mr-2 rounded-full'>
                                        <i className="fa-solid fa-list text-lg text-white m-1"></i>
                                    </div>
                                    <div>
                                        <h4 className='text-cyan-600 font-bold'>FACILITIES & FEATURES</h4>
                                    </div>
                                </div>
                                <div className='ps-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                                    <p>Wheelchair friendly</p>
                                    <p>Parking</p>
                                    <p>Air Conditioned</p>
                                    <p>Wifi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white shadow p-3'>
                        <h3 className='font-bold mb-3'>Ratings & Reviews</h3>
                        <div className='border border-1 p-3 flex text-center'>
                            <div className='w-1/2'>
                                detailed
                            </div>
                            <div className='w-1/2'>
                                stars
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default page
