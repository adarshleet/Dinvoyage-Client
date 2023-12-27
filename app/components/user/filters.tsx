'use client'
import { allCuisines, allFacilities } from '@/apis/admin'
import { filterRestaurants } from '@/apis/user';
import React, { useEffect, useState } from 'react'
import { FiPlus, FiMinus } from "react-icons/fi";

interface Restaurant {
    _id: string;
    banners: string[];
    landmark: string;
    locality: string;
    restaurantName:string
    minCost:number
  }

interface filterProps{
    setRestaurant: React.Dispatch<React.SetStateAction<Restaurant[]>>;
}

const Filters = ({setRestaurant}:filterProps) => {

    const [cuisines, setCuisines] = useState([])
    const [facilities, setFacilities] = useState([])
    const [facilitiesShow, setFacilitiesShow] = useState(false)
    const [cuisinesShow, setCuisinesShow] = useState(false)

    const [checkedCuisines, setCheckedCuisines] = useState([]);
    const [checkedFacilities, setCheckedFacilities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await allCuisines()
            const response = await allFacilities()
            setCuisines(res?.data)
            setFacilities(response?.data)
            // const resp = await filterRestaurants(updatedCheckedCuisines, checkedFacilities);
            // const data = resp?.data.data;
            // setRestaurant(data.filterResult);
        }
        fetchData()
    },[])


    const handleCuisineChange = async (index:number, checked:boolean) => {
        const updatedCheckedCuisines = checked
          ? [...checkedCuisines, cuisines[index]]
          : checkedCuisines.filter((cuisine) => cuisine !== cuisines[index]);
      
        setCheckedCuisines(updatedCheckedCuisines);
      
        const res = await filterRestaurants(updatedCheckedCuisines, checkedFacilities);
        const data = res?.data.data;
        setRestaurant(data.filterResult);
      };



      const handleFacilityChange = async (index:number, checked:boolean) => {
        const updatedCheckedFacilities = checked
          ? [...checkedFacilities, facilities[index]]
          : checkedFacilities.filter((facility) => facility !== facilities[index]);
      
        setCheckedFacilities(updatedCheckedFacilities);
      
        const res = await filterRestaurants(checkedCuisines, updatedCheckedFacilities);
        const data = res?.data.data;
        setRestaurant(data.filterResult);
      };
      


    return (
        <div className='w-60 hidden md:block'>
            <div>
                <div className='flex bg-white items-center px-5 py-2.5 cursor-pointer' onClick={() => setCuisinesShow(!cuisinesShow)}>
                    <button
                        id="dropdownBgHoverButton"
                        data-dropdown-toggle="dropdownBgHover"
                        className="text-gray-500 font-bold bg-white w-full focus:outline-none rounded-sm text-sm text-center inline-flex items-center"
                        type="button"
                    >
                        Cuisines
                    </button>
                    {cuisinesShow ? <FiMinus /> : <FiPlus />}
                </div>

                {/* Dropdown menu */}
                <div id="dropdownBgHover" className={`z-10 w-full bg-white rounded-sm shadow ${!cuisinesShow && 'hidden'}`}>
                    <ul className="pt-0 p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownBgHoverButton">
                        {cuisines.map((cuisine, index) => (
                            <li key={index}>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-200">
                                    <input
                                        id={`checkbox-item-${index}`}
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounde"
                                        onChange={(e) => handleCuisineChange(index, e.target.checked)}
                                    />
                                    <label
                                        htmlFor={`checkbox-item-${index}`}
                                        className="w-full ml-2 text-sm font-medium text-gray-700 rounded capitalize"
                                    >
                                        {cuisine}
                                    </label>
                                </div>
                            </li>))}
                    </ul>
                </div>
            </div>
            <div>
                <div className='flex bg-white items-center px-5 py-2.5 cursor-pointer' onClick={() => setFacilitiesShow(!facilitiesShow)}>
                    <button
                        id="dropdownBgHoverButton"
                        data-dropdown-toggle="dropdownBgHover"
                        className="text-gray-500 font-bold bg-white w-full focus:outline-none rounded-sm text-sm text-center inline-flex items-center"
                        type="button"
                    >
                        Facilities
                    </button>
                    {facilitiesShow ? <FiMinus /> : <FiPlus />}
                </div>

                {/* Dropdown menu */}
                <div id="dropdownBgHover" className={`z-10 w-full bg-white rounded-sm shadow ${!facilitiesShow && 'hidden'}`}>
                    <ul className="pt-0 p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownBgHoverButton">
                        {facilities.map((facility, index) => (
                            <li key={index}>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-200">
                                    <input
                                        id={`checkbox-item-${index}f`}
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounde"
                                        onChange={(e) => handleFacilityChange(index, e.target.checked)}
                                    />
                                    <label
                                        htmlFor={`checkbox-item-${index}f`}
                                        className="w-full ml-2 text-sm font-medium text-gray-700 rounded capitalize"
                                    >
                                        {facility}
                                    </label>
                                </div>
                            </li>))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Filters
