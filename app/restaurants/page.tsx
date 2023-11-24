import React from 'react'
import Navbar from '../components/user/navbar'
import HotelCard from '../components/user/hotelCard'
import RestaurantsToShow from '../components/user/restaurantsToShow'
import Filters from '../components/user/filters'

function page() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='pt-14'>
                {/* <div className='flex justify-center py-10 px-6'> */}
                    {/* <div className='flex justify-center gap-4'>
                        <Filters />
                        <div>
                            <h1 className='font-bold text-lg'>Best Restaurants Near In Kozhikode</h1>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'> */}
                                <RestaurantsToShow/>
                            {/* </div>
                        </div>
                    </div> */}
                {/* </div> */}
            </main>
        </>
    )
}

export default page
