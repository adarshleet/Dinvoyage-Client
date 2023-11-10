'use client'
import { allCuisines, allFacilities } from '@/apis/admin'
import { SetSelectedCuisines, getRestaurant, selectedCuisinesAndFacilities } from '@/apis/vendor'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import CardRestaurant from '../loadingPages/cardRestaurant'
import toast from 'react-hot-toast'

const CusinesAndFacilities = () => {

    const [cuisines, setAllCuisines] = useState([]);
    const [allFacility, setAllFacility] = useState([]); // Updated to match the fetched facility data
    const [restaurant, setRestaurant] = useState<any>({})
    const [allRestaurant, setAllRestaurant] = useState<any>([])
    const [cuisineArray,setCuisineArray] = useState()
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true)

    const [selectedCuisines,setSelectedCuisines] = useState([])

     useEffect(() => {
        const fetchData = async () => {
            try {

                const responseCuisines = await allCuisines()
                setAllCuisines(responseCuisines?.data)

                const responseFacilities = await allFacilities()
                setAllFacility(responseFacilities?.data)

                const res = await selectedCuisinesAndFacilities();
                if (res?.data) {
                    const restaurantData = res.data.data;
                    console.log(restaurantData)
                    setAllRestaurant(restaurantData);
                    setRestaurant(restaurantData[page])
                    setSelectedCuisines(restaurantData[0].cuisines)
                    setLoading(false)
                }
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        };
        fetchData();
    }, []);


    const handleCheckboxChange = (clickedCuisine:string) => {
        const isChecked = selectedCuisines.includes(clickedCuisine);
        console.log(isChecked);
    
        if (!isChecked) {
            setSelectedCuisines(prevSelectedCuisines => [...prevSelectedCuisines, clickedCuisine]);
        } else {
            setSelectedCuisines(prevSelectedCuisines => prevSelectedCuisines.filter(cuisine => cuisine !== clickedCuisine));
        }
    };

    const handleButtonClick = async() => {
        if(!selectedCuisines.length){
            return toast.error('Select Atleast One Cuisine To Update')
        }
        console.log(selectedCuisines)
        console.log(restaurant._id)
        const res = await SetSelectedCuisines(selectedCuisines,restaurant._id)
        if(res?.data){
            toast.success('Cuisine List Updated')
        }
    };


    const pagePlus = ()=>{
        setPage(page+1)
        setRestaurant(allRestaurant[page+1])
        setSelectedCuisines(allRestaurant[page+1].cuisines)
    }

    const pageMinus = () =>{
        setPage(page-1)
        setRestaurant(allRestaurant[page-1])
        setSelectedCuisines(allRestaurant[page-1].cuisines)

    }


    if (loading) {
        return <CardRestaurant />
    }

    return (
        <div className='p-6 shadow-sm bg-white'>
            <div className='flex justify-between items-center p-3 border border-gray-500 bg-gray-600'>
                <div className=''>
                    <h4 className='text-2xl text-white font-bold'>{restaurant.restaurantName}</h4>
                    <h5 className='text-xl text-white font-bold'>{restaurant.landmark}</h5>
                </div>
                <div className='flex gap-4 text-xl text-white font-bold'>
                    <button onClick={pageMinus} disabled={page==0}><FaArrowLeft /></button>
                    <h5>{page+1}/{allRestaurant.length}</h5>
                    <button onClick={pagePlus} disabled={page == allRestaurant.length-1}><FaArrowRight /></button>
                </div>
            </div>
            <div className='my-2 p-4'>
                <div className='my-6'>
                    <h3 className='text-lg font-bold'>Select Available Cuisines</h3>
                    <div className='flex flex-wrap py-3 gap-8 mb-5'>
                        {
                            cuisines.map((cuisine, index) => (
                                <div className='' key={index}>
                                    <input checked={selectedCuisines.includes(cuisine)} type="checkbox" className='mx-2' onChange={() => handleCheckboxChange(cuisine)}/>
                                    <label htmlFor="">{cuisine}</label>
                                </div>
                            ))
                        }
                    </div>
                    <button className='px-3 py-2 bg-cyan-600 text-white font-bold rounded-sm' onClick={handleButtonClick}>UPDATE CUISINE LIST</button>
                </div>
                <div className='my-10'>
                    <h3 className='text-lg font-bold'>Select Available Facilities</h3>
                    <div className='flex flex-wrap py-3 gap-8 mb-5'>
                        {
                            allFacility.map((facility: string, index: number) => (
                                <div className='' key={index}>
                                    <input type="checkbox" className='mx-2' />
                                    <label htmlFor="">{facility}</label>
                                </div>
                            ))
                        }
                    </div>
                    <button className='px-3 py-2 bg-cyan-600 text-white font-bold rounded-sm'>UPDATE FACILITIES LIST</button>
                </div>
            </div>
        </div>
    )
}

export default CusinesAndFacilities
