'use client'
import React, { useEffect, useState } from 'react'
import LocationModal from './locationModal'
import { addLocality, allLocalities } from '@/apis/admin'
import toast from 'react-hot-toast'
import { FaAngleDown } from "react-icons/fa6";


const LocationTable = () => {

    const [modal, setModal] = useState(false)
    const [district, setDistrict] = useState('')
    const [locality, setLocality] = useState('')
    const [dropDown,setDropDown] = useState(false)
    const [districts,setDistricts] = useState([])
    const [dropDownDistrict,setDropDownDistrict] = useState('')

    const [localities, setLocalities] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await allLocalities()
                const data = res?.data.data
                setDistricts(data)
                setLocalities(data[0].locations)
                setDropDownDistrict(data[0].district)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])


    const onCloseModal = () => {
        setModal(false)
    }

    const onSubmitHandle = async (e) => {
        try {
            e.preventDefault()
            if (locality.trim().length < 4) {
                return toast.error('Enter a valid locality')
            }
            else if (district.trim().length == 0) {
                return toast.error('Please select a district')
            }
            const res = await addLocality(district, locality)
            const data = res?.data.data
            if (!data) {
                return toast.error('Already Existing locality')
            }
            else {
                const newArray = [...localities]
                console.log(localities)
                const addedLocality = {
                    locality,
                    restaurantCount:0
                }
                setLocalities((prevLocalities)=>[...prevLocalities,addedLocality])
                toast.success('New locality added')
                setModal(false)
            }

        } catch (error) {
            console.log(error);
        }
    }


    const localitySet = (index:number)=>{
        const locality = districts[index].locations
        setLocalities(locality)
        setDropDownDistrict(districts[index].district)
        setDropDown(false)
    }


    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="p-4 bg-white ">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative mt-1">
                        {/* <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Search Localities, Districts"
                        /> */}
                        <div className='px-3 py-2 border border-gray-400 w-48 rounded-sm flex justify-between items-center cursor-pointer'  onClick={()=>setDropDown(!dropDown)}>
                            <button className='font-semibold capitalize'>{dropDownDistrict}</button><FaAngleDown />
                        </div>
                        <div className={`${!dropDown && 'hidden'} border fixed z-10 bg-white border-gray-400 w-48 min-h-28 overflow-hidden overflow-y-scroll capitalize font-semibold`}>
                            {districts.map((data,index)=>(
                                <p className='px-3 py-2 hover:bg-gray-200 cursor-pointer' key={index} onClick={()=>localitySet(index)}>{data.district}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-base text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Locality
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Number of restaurants
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            {localities.map((data)=>(
                            <tr className='bg-white '>
                                <td className="px-6 py-4 whitespace-nowrap capitalize text-base">
                                    <div className="flex items-center ">
                                        <div className="font-semibold text-gray-500">
                                            {data.locality}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap capitalize text-base">
                                    <div className="flex items-center ">
                                        <div className="font-semibold text-gray-500">
                                            {data.restaurantCount}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap capitalize text-base">
                                    <div className="flex items-center">
                                        <div className="font-semibold text-gray-500">
                                            <button className='py-1 px-2 bg-green-700 text-white font-bold rounded-sm'>Edit</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <button className='py-2 px-3 bg-gray-900 text-white font-bold rounded-sm mt-2' onClick={() => setModal(true)}>Add Locality</button>
            <LocationModal modal={modal} onCloseModal={onCloseModal} district={district} locality={locality} setLocality={setLocality} setDistrict={setDistrict} onSubmit={onSubmitHandle} />
        </>

    )
}

export default LocationTable
