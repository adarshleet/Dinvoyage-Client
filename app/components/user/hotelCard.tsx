import Link from 'next/link'
import React from 'react'

const HotelCard = () => {
    return (
        <Link href="/restaurant" className="block m-2">
            <div className="max-w-sm md:max-w-xs  bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray">
                <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                <div className="p-3">
                    <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900">Paragon Restaurant</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">Near CH over bridge, Kozhikode </p>
                </div>
            </div>
        </Link>
    )
}

export default HotelCard
