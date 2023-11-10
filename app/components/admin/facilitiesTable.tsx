'use client'
import { addFacilities, allFacilities, deleteFacility, editFacility } from '@/apis/admin';
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast';



interface Data {
    _id: string;
    facilities: string[];
}

const FacilitiesTable = () => {
    const [facilities, setFacilities] = useState<Data[]>([])
    const [row, setRow] = useState(false)
    const [facility, setFacility] = useState('')
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [editedFacility, setEditedFacility] = useState('')
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
    // const {isLoading,data,refetch} = useQuery({queryKey:['facilities'],queryFn:allFacilities})
    // if(!isLoading){
    //     console.log(data?.data)
    // }

    useEffect(() => {
        const fetchData = async () => {
            const res = await allFacilities()
            setFacilities(res?.data)
        }
        fetchData()
    }, [])

    const addFacilityInput = () => {
        setRow(true)
    }


    const addFacility = async () => {
        if (facility.trim().length < 4) {
            return toast.error('Enter the facility')
        }
        const res = await addFacilities(facility)
        const data = res?.data.data
        console.log(data)
        if (data.modifiedCount == 0) {
            toast.error('Already existing facility')
        }
        else {
            console.log('here')

            const newFacilities: Data[] = [...facilities, facility]
            setFacilities(newFacilities)
            setRow(false)
            setFacility('')
            toast.success('Facility Added Successfully')
        }
    }


    const onEditClick = (index: number, facility: string) => {
        setEditIndex(index)
        setEditedFacility(facility)
    }

    const onSaveEdit = async (index: number) => {
        const res = await editFacility(index, editedFacility)
        const data = res?.data.data
        console.log(data)
        if(editedFacility.trim().length < 3){
            return toast.error('Enter the Facility')
        }

        if (!data) {
            toast.error('Already existing facility')
        }
        else {
            const updatedFacilities = [...facilities];
            updatedFacilities[index] = editedFacility;

            setFacilities(updatedFacilities);
            setEditIndex(null);
            setRow(false);
            toast.success('Facility details edited')
        }
    };

    const onDelete = async (index: number) => {
        setDeleteIndex(index)
    }

    const onConfirmDelete = async (facility:string,index:number) =>{
        const res = await deleteFacility(facility)
        const data = res?.data.data
        if(data.modifiedCount == 1){
            facilities.splice(index,1)
            setFacilities(facilities)
            setDeleteIndex(null)
            toast.success('Facility deleted successfully')
        }
    }



    return (
        <div className="relative overflow-x-auto w-1/2">
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Facilities
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {facilities.length > 0 ? facilities.map((facility, index) => (
                        <tr className="bg-white" key={index}>
                            <td
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        className="p-1 border border-gray-600"
                                        value={editedFacility}
                                        onChange={(e) => setEditedFacility(e.target.value)}
                                    />
                                ) : (
                                    <>
                                        {facility}
                                    </>
                                )}
                            </td>
                            <td className="px-6 py-4">
                            {deleteIndex === index ? (
                                    <div>
                                        <button className="bg-red-800 text-white py-1 px-2 rounded-sm font-bold mx-1" onClick={() => onConfirmDelete(facility,index)}>
                                            Confirm ?
                                        </button>
                                        <button className="bg-gray-500 text-white py-1 px-2 rounded-sm font-bold" onClick={() => setDeleteIndex(null)}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : editIndex === index ? (
                                    <>
                                        <button
                                            className="bg-green-600 text-white py-1 px-2 rounded-sm font-bold mx-1"
                                            onClick={() => onSaveEdit(index)}
                                        >
                                            Save
                                        </button>
                                        <button className="bg-red-800 text-white py-1 px-2 rounded-sm font-bold" onClick={() => setEditIndex(null)}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="bg-green-600 text-white py-1 px-2 rounded-sm font-bold mx-1"
                                            onClick={() => onEditClick(index, facility)}
                                        >
                                            Edit
                                        </button>
                                        <button className="bg-red-800 text-white py-1 px-2 rounded-sm font-bold" onClick={() => onDelete(index)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    )) :
                        <h1>no data</h1>
                    }
                    {row &&
                        <tr className='bg-white'>
                            <td className='px-5 py-3'>
                                <input type="text" className='p-1 border border-gray-600' value={facility} onChange={(e) => setFacility(e.target.value)} />
                            </td>
                            <td className='px-6 py-3'>
                                <button className='bg-green-600 mx-1 text-white py-1 px-2 rounded-sm font-bold' onClick={addFacility}>Add</button>
                                <button className='bg-red-800 py-1 px-2 rounded-sm font-bold text-white' onClick={() => setRow(false)}>Close</button>
                            </td>
                        </tr>
                    }

                </tbody>
            </table>
            <button className='bg-cyan-800 px-2 rounded-sm text-white py-1 my-1 font-bold' onClick={addFacilityInput}>Add facility</button>
        </div>
    )
}

export default FacilitiesTable



