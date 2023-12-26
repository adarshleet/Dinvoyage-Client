'use client'
import React, { use, useEffect, useState } from 'react'
import CategoryModal from './categoryModal'
import { addRestaurantCategory, allCategories, changeCategoryStatus, editRestaurantCategory, getRestaurant, selectedCuisinesAndFacilities } from '@/apis/vendor'
import {BsFillArrowRightSquareFill,BsFillArrowLeftSquareFill} from 'react-icons/bs'
import toast from 'react-hot-toast'
import ConfirmPopup from './confirmPopup'
import CardRestaurant from '../loadingPages/cardRestaurant'
import Link from 'next/link'
import { FaEdit } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";

interface category{
    _id:string
    category: string; 
    isListed: boolean;
}

const CategoryTable = () => {

    const [modal,setModal] = useState(false)
    const [category,setCategory] = useState('')
    const [allCategory,setAllCategory] = useState<category[]>([])
    const [restaurant,setRestaurant] = useState<any>({})
    const [allRestaurant,setAllRestaurant] = useState<any>([])
    const [page,setPage] = useState(0)

    const [editMode,setEditMode] = useState(false)
    const [categoryToEdit,setCategoryToEdit] = useState('')
    const [editCategoryId,setEditCategoryId] = useState('')

    const [confirmBox,setConfirmBox] = useState(false)
    const [loading,setLoading] = useState(true)

    const [pagination,setPagination] = useState(1)
    const [currentPage,setCurrentPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [search,setSearch] = useState('')


    useEffect(()=>{
        const fetchData = async ()=>{
            // const res = await getRestaurant()
            const res = await selectedCuisinesAndFacilities();

            if(res?.data){
                const restaurantData = res.data.data;
                setAllRestaurant(restaurantData);
                setRestaurant(restaurantData[page])
                if(restaurantData[page]){
                    const response = await allCategories(restaurantData[page]._id,search,pagination)
                    const categories = response?.data.data
                    console.log(categories)
                    setAllCategory(categories.categories)
                    setTotalPages(categories.totalPages)
                    setCurrentPage(categories.currentPage)
                }
                setLoading(false)
            }
        }
        fetchData()
    },[pagination,search,page])


    const pagePlus = async() =>{
        setSearch('')
        setPagination(1)
        setPage(page+1)
        setRestaurant(allRestaurant[page+1])
        if(allRestaurant[page+1]){
            const response = await allCategories(allRestaurant[page+1]._id,search,pagination)
            const categories = response?.data.data
            setAllCategory(categories.categories)
            setTotalPages(categories.totalPages)
            setCurrentPage(categories.currentPage)
        }
    }

    const pageMinus = async() =>{
        setSearch('')
        setPagination(1)
        setPage(page-1)
        setRestaurant(allRestaurant[page-1])
        if(allRestaurant[page-1]){
            const response = await allCategories(allRestaurant[page-1]._id,search,pagination)
            const categories = response?.data.data
            setAllCategory(categories.categories)
            setTotalPages(categories.totalPages)
            setCurrentPage(categories.currentPage)
        }
    }

    const closeModal = () =>{
        setEditMode(false)
        setCategory('')
        setModal(false)
    }


    const categoryOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setCategory(e.target.value)
        console.log(category)
    }


    const handleAddCategory = async() =>{

        if(category.trim().length < 4){
            return toast.error('Please Enter Valid Category')
        }

        const res = await addRestaurantCategory(restaurant._id,category)
        console.log(res)

        if(!res?.data.data){
            return toast.error('Already Existing Category')
        }

        const addedCategory = {
            _id:'',
            category: category,
            isListed: true
        }
        setAllCategory((prevCategories) => [...prevCategories, addedCategory]);

        // Close the modal
        toast.success('Category Added Succesfully')
        closeModal();
    }


    const editCategoryHandle = async (category:string,categoryID:string)=>{
        setEditMode(true)
        setCategoryToEdit(category)
        setCategory(category)
        setEditCategoryId(categoryID)
        setModal(true)
    }


    const editCategory = async ()=>{
        if(category === categoryToEdit){
            return toast.error('Make any changes to edit')
        }
        else if(category.trim().length < 4){
            return toast.error('Please Enter Valid Category')
        }

        const res = await editRestaurantCategory(editCategoryId,category)
        if(!res?.data.data){
            return toast.error('Already Existing Category')
        }

        setAllCategory((prevCategories) =>
            prevCategories.map((c) =>
                c.category === categoryToEdit ? { ...c, category: category } : c
            )
        );
        toast.success('Category Edited Successfully')
        setCategory('')
        setEditMode(false)
        setModal(false)
    }



    const statusChangeClickHandle = (categoryId:string)=>{
        setConfirmBox(true)
        setCategory(categoryId)
    }

    const closeConfirmBox = () => {
        setConfirmBox(false)
        setCategory('')
    }

    const confirmChangeStatus = async()=>{

        const res = await changeCategoryStatus(category)
        if(res?.data.data){
            setAllCategory((prevCategories) =>
                prevCategories.map((c) =>
                    c._id === category ? { ...c, isListed: !c.isListed } : c
                )
            );
            setConfirmBox(false)
            setCategory('')
        }
    }


    if(loading){
        return <CardRestaurant/>
    }

    if(!allRestaurant.length && !loading){
        return <div className='text-center py-4'>
            <h2 className='font-bold text-2xl mb-2'>NO APPROVED RESTAURANTS FOUND</h2>
            <p className='font-semibold text-base'>You can only add item categories after approval of admin.</p>

            {/* <Link href={'/vendor/addRestaurant'} className='px-4 py-3 rounded-lg bg-gray-600 text-white font-bold m-2'>ADD A RESTAURANT</Link> */}
        </div>
    }


    return (
        <>
        <div className='w-full bg-slate-700 pb-10 p-3 rounded-md mb-16 relative'>
                <h1 className='font-bold text-white text-center mb-2'>CATEGORIES</h1>
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
        <div className="block w-full overflow-x-auto shadow-lg border">
            <div className='m-3'>
                <input type="text"  value={search} onChange={(e)=>setSearch(e.target.value)} className='px-2 py-2 focus:outline-none border-gray-400 border rounded-sm text-sm' placeholder='Search category...' />
            </div>
            <table className="items-center w-full bg-transparent border-collapse">
                <thead className='text-base font-bold'>
                    <tr>
                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                            Category
                        </th>
                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                            Status
                        </th>
                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-semibold text-base text-gray-600">
                    {allCategory.map((category,index)=>(
                    <tr className="text-gray-600 hover:bg-gray-200" key={index}>
                        <td className="border-t-0 align-middle whitespace-nowrap p-3 capitalize">
                            {category.category}
                        </td>
                        <td className="border-t-0 align-middle whitespace-nowrap p-3">
                            {category.isListed ? 'Listed' : 'Unlisted'}
                        </td>
                        <td className="border-t-0 align-middle whitespace-nowrap p-3">
                            <button className='font-bold px-1 py-1 text-xl mx-1' onClick={()=>editCategoryHandle(category.category,category._id)}><FaEdit/></button>
                            <button className='font-bold px-1 py-1 text-xl  mx-1' onClick={()=>statusChangeClickHandle(category._id)}><IoIosEye/></button>
                        </td>
                    </tr>
                    )) }
                    
                </tbody>
            </table>
        </div>
        <div className='flex justify-between items-center mt-3 mb-5'>
                <nav aria-label="Page navigation example">
                    <ul className="list-style-none flex">
                        <li>
                            <button className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-gray-700 font-bold transition-all duration-300"
                                onClick={()=>setPagination(pagination-1)}
                                disabled={pagination==1}
                            >
                                Previous
                            </button>
                        </li>
                        
                        <li aria-current="page">
                            <button
                                className="relative block rounded bg-neutral-800 px-3 py-1.5 text-sm font-medium text-neutral-50 transition-all duration-300 dark:bg-neutral-900"
                            >
                                {currentPage}
                                <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                                    (current)
                                </span>
                            </button>
                        </li>
                        
                        <li>
                            <button
                                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-gray-700 font-bold transition-all duration-300"
                                onClick={()=>setPagination(pagination+1)}
                                disabled={pagination === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>

                <button className='px-3 py-2 my-2 bg-cyan-950 rounded-sm text-white font-bold' onClick={()=>setModal(!modal)}>ADD NEW CATEGORY</button>
            </div>
        
        <CategoryModal show={modal} closeModal={closeModal} categoryChange={categoryOnChange} addCategory={handleAddCategory} category={category} categoryToEdit={categoryToEdit} editMode={editMode} editCategory={editCategory}/>
        <ConfirmPopup confirmBox={confirmBox} closeConfirmBox={closeConfirmBox} confirmChangeStatus={confirmChangeStatus}/>
        </>

    )
}

export default CategoryTable
