'use client'
import { addItemToKitchen, allCategories, changeItemStatus, editItem, getAllKitchenItems, getRestaurant, selectedCuisinesAndFacilities } from '@/apis/vendor'
import React, { useEffect, useState, ChangeEvent } from 'react'
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs'
import KitchenModal from './kitchenModal'
import CardRestaurant from '../loadingPages/cardRestaurant'
import Link from 'next/link'
import toast from 'react-hot-toast'


const KitchenTable = () => {


    const [items, setItems] = useState<any>([])
    const [itemModal, setItemModal] = useState(false)
    const [restaurantId, setRestaurantId] = useState('')
    const [categories, setCategories] = useState([])
    const [itemData, setItemData] = useState({
        itemName: '',
        category: '',
        price: '',
        veg: false,
        description: '',
        isListed: true,
        image: ''
    });
    const [image, setImage] = useState({})

    const [restaurant, setRestaurant] = useState<any>({})
    const [allRestaurant, setAllRestaurant] = useState<any>([])
    const [page, setPage] = useState(0)

    const [loading, setLoading] = useState(true)
    const [categoryEmpty, setCategoryEmpty] = useState(false)

    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            // const res = await getRestaurant()
            const res = await selectedCuisinesAndFacilities();

            if (res?.data) {
                const restaurantData = res.data.data;
                console.log(restaurantData)
                setAllRestaurant(restaurantData);
                setRestaurant(restaurantData[page])
                if (restaurantData[page]) {
                    const response = await allCategories(restaurantData[page]._id)
                    const categories = response?.data.data
                    setCategories(categories)
                    setLoading(false)

                    if (categories.length) {
                        const res = await getAllKitchenItems(restaurantData[page]._id)
                        const kitchenItems = res.data.data
                        setItems(kitchenItems.items)
                    }
                    else {
                        setCategoryEmpty(true)
                    }
                }
            }
        }
        fetchData()
    }, [])


    const pagePlus = async () => {
        setPage(page + 1)
        setRestaurant(allRestaurant[page + 1])
        if (allRestaurant[page + 1]) {
            const response = await allCategories(allRestaurant[page + 1]._id)
            const categories = response?.data.data
            setCategories(categories)
            const res = await getAllKitchenItems(allRestaurant[page + 1]._id)
            const kitchenItems = res.data.data
            setItems(kitchenItems.items)
        }

    }

    const pageMinus = async () => {
        setPage(page - 1)
        setRestaurant(allRestaurant[page - 1])
        if (allRestaurant[page - 1]) {
            const response = await allCategories(allRestaurant[page - 1]._id)
            const categories = response?.data.data
            setCategories(categories)
            const res = await getAllKitchenItems(allRestaurant[page - 1]._id)
            const kitchenItems = res.data.data
            setItems(kitchenItems.items)
        }
    }


    const setKitchenModal = () => {
        setEdit(false)
        setEditId('')
        setItemData({
            itemName: '',
            category: '',
            price: '',
            veg: false,
            description: '',
            isListed: true,
            image: ''
        });
        setImage({})
        setItemModal(!itemModal)
    }

    const openKitchenModal = () => {
        setEdit(false)
        setItemModal(true)
    }

    const openEditModal = (index: string) => {
        setEdit(true)
        const item = items[index]
        setEditId(item._id)
        setItemData({
            itemName: item.itemName,
            category: item.category._id,
            price: item.price,
            veg: item.veg,
            description: item.description,
            isListed: item.isListed,
            image: item.image
        });
        setItemModal(true)
    }


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setItemData((prevItemData) => ({
            ...prevItemData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files && e.target.files[0]

        if (file) {
            const image = URL.createObjectURL(file);
            setItemData({ ...itemData, image })
            setImage(file)
        }
    }


    const handleKitchenFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (itemData.itemName.trim().length < 4) {
            return toast.error('Please enter a valid item name')
        }
        // else if(parseInt(itemData.price.trim()) < 5 || itemData.price.trim().length == 0){
        //     return toast.error('Please enter correct item price')
        // }
        else if (itemData.category.trim().length == 0) {
            return toast.error('Please select a category')
        }

        const formData = new FormData();
        formData.append('itemName', itemData.itemName);
        formData.append('category', itemData.category);
        formData.append('price', itemData.price);
        formData.append('veg', itemData.veg.toString());
        formData.append('description', itemData.description);
        if (image) {
            console.log(image)
            formData.append('image', image);
        }

        let res

        if (edit) {
            res = await editItem(editId, formData)
            const editStatus = res?.data.data

            if(editStatus){
                let categoryName = '';
                const foundCategory = categories.find(category => itemData.category === category._id);
                if (foundCategory) {
                    categoryName = foundCategory.category;
                }
                itemData.category = { _id:foundCategory._id,category: categoryName }

                const updatedItems = items.map((item) => {
                    if (item._id === editId) {
                      // If the item ID matches the edited item's ID, update it
                      return { ...item, ...itemData };
                    }
                    return item;
                  });
              
                setItems(updatedItems);

                setItemData({
                    itemName: '',
                    category: '',
                    price: '',
                    veg: false,
                    description: '',
                    isListed: true,
                    image: ''
                });
                setEdit(false)
                setEditId('')
                setImage({})

                setItemModal(false);
            }
        }
        else {
            res = await addItemToKitchen(restaurant._id, formData)

            if (res.data.data) {
                //adding value to table
                let categoryName = '';
                const foundCategory = categories.find(category => itemData.category === category._id);
                if (foundCategory) {
                    categoryName = foundCategory.category;
                }
                itemData.category = { category: categoryName }
                setItems((prevItems) => [...prevItems, itemData]);

                setItemData({
                    itemName: '',
                    category: '',
                    price: '',
                    veg: false,
                    description: '',
                    isListed: true,
                    image: ''
                });

                setItemModal(false);

            }
        }

    };


    const changeItemsStatus = async(itemId:string)=>{
        try {
            const res = await changeItemStatus(itemId)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    if (loading) {
        return <CardRestaurant />
    }

    if (!allRestaurant.length && !loading) {
        return <div className='text-center py-4'>
            <h2 className='font-bold text-2xl mb-2'>NO APPROVED RESTAURANTS FOUND</h2>
            {/* <Link href={'/vendor/addRestaurant'} className='px-4 py-3 rounded-lg bg-gray-600 text-white font-bold m-2'>ADD A RESTAURANT</Link> */}
            <p className='font-semibold text-base'>You can only add Kitchen Items after approval of admin.</p>
        </div>
    }

    if (categoryEmpty) {
        return <div className='text-center py-4'>
            <h2 className='font-bold text-2xl mb-2'>NO CATEGORIES FOUND</h2>
            <p className='font-semibold text-base mb-3'>Items can only be added to the kitchen after assigning a category.</p>
            <Link href={'/vendor/categories'} className='px-4 py-2 rounded-lg bg-gray-600 text-white font-bold m-2'>ADD CATEGORY</Link>

        </div>
    }


    return (
        <>
            <div className='flex justify-between items-center p-3 border shadow-md bg-white mb-2'>
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
            <div className="block w-full overflow-x-auto shadow-lg border">
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead className='text-base font-bold'>
                        <tr>
                            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                Item
                            </th>
                            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                Category
                            </th>
                            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                Price
                            </th>
                            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                Type
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
                        {items.map((item, index) => (
                            <tr className="text-gray-600 hover:bg-gray-200 capitalize" key={index}>
                                <td className="border-t-0 align-middle whitespace-nowrap p-3">
                                    {item.itemName}
                                </td>
                                <td className="border-t-0 align-middle whitespace-nowrap p-3">
                                    {item.category.category}
                                </td>
                                <td className="border-t-0 align-middle whitespace-nowrap p-3">
                                    ₹{item.price}
                                </td>
                                <td className="border-t-0 align-middle whitespace-nowrap p-3">
                                    {item.veg ? 'Veg' : 'Non-Veg'}
                                </td>
                                <td className="border-t-0 align-middle whitespace-nowrap p-3">
                                    {item.isListed ? 'Listed' : 'Unlisted'}
                                </td>
                                <td className="border-t-0 align-middle whitespace-nowrap p-3">
                                    <button className='bg-green-700 text-white text-sm font-bold px-4 py-1 rounded-md mx-1' onClick={() => openEditModal(index)}>Edit</button>
                                    <button className='bg-red-700 text-white font-bold text-sm px-4 py-1 rounded-md mx-1' onClick={()=>changeItemsStatus(item._id)}>{item.isListed ? 'Unlist' : 'list'}</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <div className='flex'>
                <button className='px-3 py-2 my-2 bg-cyan-950 rounded-sm text-white font-bold' onClick={openKitchenModal}>ADD NEW ITEM</button>
            </div>
            <KitchenModal
                itemModal={itemModal}
                setKitchenModal={setKitchenModal}
                categories={categories}
                handleInputChange={handleInputChange}
                itemData={itemData}
                setItemData={setItemData}
                handleFormSubmit={handleKitchenFormSubmit}
                handleFileChange={handleFileChange}
                edit={edit}
            />
        </>
    )
}

export default KitchenTable
