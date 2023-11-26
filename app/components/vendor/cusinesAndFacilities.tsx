'use client'
import { allCuisines, allFacilities } from '@/apis/admin'
import { SetSelectedCuisines, SetSelectedFacilities, getRestaurant, selectedCuisinesAndFacilities } from '@/apis/vendor'
import React, { useEffect, useState } from 'react'
import {BsFillArrowRightSquareFill,BsFillArrowLeftSquareFill} from 'react-icons/bs'
import CardRestaurant from '../loadingPages/cardRestaurant'
import toast from 'react-hot-toast'
import Link from 'next/link'

const CusinesAndFacilities = () => {

    const [cuisines, setAllCuisines] = useState([]);
    const [allFacility, setAllFacility] = useState([]); // Updated to match the fetched facility data
    const [restaurant, setRestaurant] = useState<any>({})
    const [allRestaurant, setAllRestaurant] = useState<any>([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true)

    const [selectedCuisines,setSelectedCuisines] = useState([])
    const [selectedFacilities,setSelectedFacilities] = useState([])

     useEffect(() => {
        const fetchData = async () => {
            try {

                const responseCuisines = await allCuisines()
                setAllCuisines(responseCuisines?.data)

                const responseFacilities = await allFacilities()
                setAllFacility(responseFacilities?.data)

                const res = await selectedCuisinesAndFacilities();
                console.log(res?.data.data)
                if (res?.data) {
                    const restaurantData = res.data.data;
                    console.log(restaurantData)
                    setAllRestaurant(restaurantData);
                    if(restaurantData[page]){
                        setRestaurant(restaurantData[page])
                        setSelectedCuisines(restaurantData[0].cuisines)
                        setSelectedFacilities(restaurantData[0].facilities)
                    }
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


    const handleFacilityCheckboxChange = (clickedFacility:string)=>{
        const isChecked = selectedFacilities.includes(clickedFacility)
        if(!isChecked){
            setSelectedFacilities(prevSelectedFacilities => [...prevSelectedFacilities,clickedFacility])
        }
        else{
            setSelectedFacilities(prevSelectedFacilities => prevSelectedFacilities.filter(facility => facility !== clickedFacility))
        }
    }

    const handleButtonClick = async() => {
        if(!selectedCuisines.length){
            return toast.error('Select Atleast One Cuisine To Update')
        }
        
        const res = await SetSelectedCuisines(selectedCuisines,restaurant._id)
        if(res?.data){
            toast.success('Cuisine List Updated')
        }
    };


    const handleFacilityButtonClick = async()=>{
        if(!selectedFacilities.length){
            return toast.error('Select Atlest One Facility To Update')
        }

        const res = await SetSelectedFacilities(selectedFacilities,restaurant._id)
        console.log(res)

        if(res?.data){
            toast.success('Facility List Updated')
        }
    }


    const pagePlus = ()=>{
        setPage(page+1)
        setRestaurant(allRestaurant[page+1])
        setSelectedCuisines(allRestaurant[page+1].cuisines)
        setSelectedFacilities(allRestaurant[page+1].facilities)
    }

    const pageMinus = () =>{
        setPage(page-1)
        setRestaurant(allRestaurant[page-1])
        setSelectedCuisines(allRestaurant[page-1].cuisines)
        setSelectedFacilities(allRestaurant[page-1].facilities)
    }


    if (loading) {
        return <CardRestaurant />
    }

    if(!allRestaurant.length && !loading){
        return <div className='text-center py-4'>
            <h2 className='font-bold text-2xl mb-2'>NO APPROVED RESTAURANTS FOUND</h2>
            <p className='font-semibold text-base'>You can only add cuisines and facilities after approval of admin.</p>

            {/* <Link href={'/vendor/addRestaurant'} className='px-4 py-3 rounded-lg bg-gray-600 text-white font-bold m-2'>ADD A RESTAURANT</Link> */}
        </div>
    }

    return (
        <>
        <div className='w-full bg-slate-700 pb-10 p-3 rounded-md mb-16 relative'>
                <h1 className='font-bold text-white text-center mb-2'>CUISINES & FACILITIES</h1>
                <div className='flex justify-between items-center p-3 border shadow-md bg-white mb-2 absolute rounded-sm left-3 right-3'>
                    <div className=''>
                        <h4 className='text-xl text-gray-800 font-bold'>{restaurant?.restaurantName}</h4>
                        <h5 className='text-md text-gray-700 font-semibold'>{restaurant?.landmark}</h5>
                    </div>
                    <div className='flex gap-4 text-xl text-gray-600 font-bold'>
                        <button onClick={pageMinus} disabled={page === 0}><BsFillArrowLeftSquareFill /></button>
                        <h5>{page + 1}/{allRestaurant.length}</h5>
                        <button onClick={pagePlus} disabled={page === allRestaurant.length - 1}><BsFillArrowRightSquareFill /></button>
                    </div>
                </div>
            </div>
        <div className='p-6 shadow-sm bg-white'>    
            <div className='my-2 p-4'>
                <div className='mb-10'>
                    <h3 className='text-lg font-bold'>Select Available Cuisines</h3>
                    <div className='flex flex-wrap py-3 gap-8 mb-2'>
                        {
                            cuisines.map((cuisine, index) => (
                                <div className='' key={index}>
                                    <input checked={selectedCuisines.includes(cuisine)} type="checkbox" className='mx-2' onChange={() => handleCheckboxChange(cuisine)}/>
                                    <label htmlFor="">{cuisine}</label>
                                </div>
                            ))
                        }
                    </div>
                    <button className='px-3 py-2 text-sm bg-cyan-600 text-white font-bold rounded-sm' onClick={handleButtonClick}>UPDATE CUISINE LIST</button>
                </div>
                <div className=''>
                    <h3 className='text-lg font-bold'>Select Available Facilities</h3>
                    <div className='flex flex-wrap py-3 gap-8 mb-2'>
                        {
                            allFacility.map((facility: string, index: number) => (
                                <div className='' key={index}>
                                    <input checked={selectedFacilities.includes(facility)} type="checkbox" className='mx-2' onChange={()=>handleFacilityCheckboxChange(facility)}/>
                                    <label htmlFor="">{facility}</label>
                                </div>
                            ))
                        }
                    </div>
                    <button className='px-3 py-2 text-sm bg-cyan-600 text-white font-bold rounded-sm' onClick={handleFacilityButtonClick}>UPDATE FACILITIES LIST</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default CusinesAndFacilities
