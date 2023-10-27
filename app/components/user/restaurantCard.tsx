import React from 'react'

const RestaurantCard = () => {
    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 shadow md:flex-row md:max-w-4xl">
            <div>
                <img className="" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
            </div>
            <div className="flex flex-col justify-start h-full p-4 leading-normal w-full md:w-1/2">
                <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">Paragon Restaurant</h5>
                <p className="mb-2 font-normal text-gray-500">Near CH hover bridge,  Kozhikode</p>
                <p className="mb-2 font-normal text-gray-500">₹500 for two</p>
                <p className='font-bold text-md text-blue-500 mb-1'><i className="fa-solid fa-location-arrow"></i> Get Direction</p>
                <p className='mb-8'>Time : Opens at 11:00 AM</p>
                <button className="py-2 text-white font-bold" style={{backgroundColor:'#247F9E'}}>BOOK A TABLE</button>
            </div>
        </div>
    )
}

export default RestaurantCard
