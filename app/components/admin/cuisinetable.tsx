'use client'
import { allCuisines, addCuisines, editCuisine, deleteCuisine } from '@/apis/admin'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'



const CuisineTable = () => {
    const [cuisines, setCuisines] = useState<string[]>([])
    const [row, setRow] = useState(false)
    const [cuisine, setCuisine] = useState<string>('')
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [editedCuisine, setEditedCuisine] = useState('')
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = await allCuisines()
            setCuisines(res?.data)
        }
        fetchData()
    }, [])


    const addCuisineInput = () => {
        setRow(true)
    }

    const addCuisine = async () => {
        if (cuisine.trim().length < 4) {
            return toast.error('Enter the cuisine')
        }
        const res = await addCuisines(cuisine)
        const data = res?.data.data
        console.log(data)
        if (data.modifiedCount == 0) {
            toast.error('Already existing cuisine')
        }
        else {
            const newCuisine: string[] = [...cuisines, cuisine]
            setCuisines(newCuisine)
            setRow(false)
            setCuisine('')
            toast.success('Cuisine Added Successfully')
        }
    }


    const onEditClick = (index: number, cuisine: string) => {
        setEditIndex(index)
        setEditedCuisine(cuisine)
    }


    const onSaveEdit = async (index: number) => {
        const res = await editCuisine(index, editedCuisine)
        const data = res?.data.data
        console.log(data)
        if(editedCuisine.trim().length < 3){
            return toast.error('Enter the cuisine')
        }

        if (!data) {
            toast.error('Already existing cuisine')
        }
        else {
            const updatedCuisines = [...cuisines];
            updatedCuisines[index] = editedCuisine;

            setCuisines(updatedCuisines);
            setEditIndex(null);
            setRow(false);
            toast.success('Cuisine details edited')
        }
    };


    const onDelete = async (index: number) => {
        setDeleteIndex(index)
    }

    const onConfirmDelete = async (cuisine:string,index:number) =>{
        const res = await deleteCuisine(cuisine)
        const data = res?.data.data
        if(data.modifiedCount == 1){
            cuisines.splice(index,1)
            setCuisines(cuisines)
            setDeleteIndex(null)
            toast.success('Cuisine deleted successfully')
        }
    }




    return (
        <div className="relative overflow-x-auto w-1/2">
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Cuisines
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cuisines.map((cuisine, index) => (
                        <tr className="bg-white" key={index}>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        className="p-1 border border-gray-600"
                                        value={editedCuisine}
                                        onChange={(e) => setEditedCuisine(e.target.value)}
                                    />
                                ) : (
                                    <>
                                        {cuisine}
                                    </>
                                )}
                            </th>
                            <td className="px-6 py-4">
                                {deleteIndex === index ? (
                                    <div>
                                        <button className="bg-red-800 text-white py-1 px-2 rounded-sm font-bold mx-1" onClick={() => onConfirmDelete(cuisine,index)}>
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
                                            onClick={() => onEditClick(index, cuisine)}
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
                    ))
                    }
                    {row &&
                        <tr className='bg-white'>
                            <td className='px-5 py-3'>
                                <input type="text" className='p-1 border border-gray-600' value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
                            </td>
                            <td className='px-6 py-3'>
                                <button className='bg-green-600 mx-1 text-white py-1 px-2 rounded-sm font-bold' onClick={addCuisine}>Add</button>
                                <button className='bg-red-800 py-1 px-2 rounded-sm font-bold text-white' onClick={() => setRow(false)}>Close</button>
                            </td>
                        </tr>
                    }
                </tbody>

            </table>

            <button className='bg-cyan-800 px-2 rounded-sm text-white py-1 my-1 font-bold' onClick={addCuisineInput}>Add Cuisine</button>

        </div>
    )
}

export default CuisineTable
