'use client'
import { allCategories } from '@/apis/vendor'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface Category {
    _id: string;
    category: string;
    // Other properties if there are any
}


interface kitchenModalProps{
    itemModal : boolean,
    setKitchenModal : ()=>void,
    categories : Category[],
    handleInputChange : (e :React.ChangeEvent<any>) => void,
    itemData : any,
    setItemData :any,
    handleFormSubmit : (e : React.FormEvent<HTMLFormElement>)=>void
    handleFileChange : (e : React.ChangeEvent<HTMLInputElement>)=>void
    edit:boolean
}



const KitchenModal = ({itemModal,setKitchenModal,categories,itemData,handleInputChange,handleFormSubmit,handleFileChange,edit,setItemData}:kitchenModalProps) => {

    //for editing
    // if(edit){
    //     useEffect(()=>{
    //         console.log(editId)
    //     },[])
    // }

    console.log(itemData)

    return (
        <>
            <div
                id="crud-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={` ${itemModal ? 'flex' : 'hidden'} fixed justify-center items-center bg-gray-950 bg-opacity-50 overflow-y-auto overflow-x-hidden  top-0 right-0 left-0 z-50 w-full inset-0 max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow ">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-lg font-semibold text-gray-900 ">
                                {edit ? 'Edit Item Details' :  "Add New item"}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                                data-modal-toggle="crud-modal"
                                onClick={setKitchenModal}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form onSubmit={handleFormSubmit} className="p-4 md:p-5" encType='multipart/form-data'>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-1">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        name="itemName"
                                        id="itemName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="Enter the Item"
                                        value={itemData.itemName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='col-span-1 flex flex-col'>
                                    <label htmlFor="">Vegetarian Item</label>
                                    <div className='flex justify-start items-center gap-2'>
                                        <label htmlFor="">Veg</label>
                                        <input name='veg' type="checkbox" checked={itemData.veg} onChange={handleInputChange}/>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="Enter the price"
                                        value={itemData.price}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name='category'
                                        className="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        value={itemData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value='empty'>Select category</option>
                                        { categories.map((category,index)=>(
                                            <option key={index} value={category._id} style={{ padding: '8px' }}>{category.category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Item Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name='description'
                                        rows={3}
                                        className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                        placeholder="Write Item description here"
                                        value={itemData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex justify-between items-center w-full col-span-2'>
                                    <div>
                                        <label htmlFor="itemImage" className='px-3 py-2 border-gray-500 border-2 font-bold text-sm'>Select Item Image</label>
                                        <input type="file" name='image' id='itemImage' className='hidden' onChange={(e) => handleFileChange(e)}/>
                                    </div>
                                    {itemData.image && <div className='w-32 m-2 h-24 overflow-hidden'>
                                        <Image width={128} height={96} src={itemData.image} alt="item image" className='w-full h-full object-cover'/>
                                    </div>}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white inline-flex w-full justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                                <svg
                                    className="me-1 -ms-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {edit ? 'Edit Item Details' : 'Add new Item'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default KitchenModal
