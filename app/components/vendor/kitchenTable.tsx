'use client'
import { addItemToKitchen, allCategories, getAllKitchenItems, getRestaurant } from '@/apis/vendor'
import React, { useEffect, useState } from 'react'
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs'
import KitchenModal from './kitchenModal'


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
        isListed: true
    });

    const [restaurant, setRestaurant] = useState<any>({})
    const [allRestaurant, setAllRestaurant] = useState<any>([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const res = await getRestaurant()
            console.log(res)
            if (res?.data) {
                const restaurantData = res.data.data;
                console.log(restaurantData)
                setAllRestaurant(restaurantData);
                setRestaurant(restaurantData[page])
                if (restaurantData[page]) {
                    const res = await getAllKitchenItems(restaurantData[page]._id)
                    const kitchenItems = res.data.data
                    setItems(kitchenItems.items)
                    const response = await allCategories(restaurantData[page]._id)
                    const categories = response?.data.data
                    setCategories(categories)
                }

            }
        }
        fetchData()
    }, [])


    const pagePlus = async () => {
        setPage(page + 1)
        setRestaurant(allRestaurant[page + 1])
        if (allRestaurant[page + 1]) {
            const res = await getAllKitchenItems(allRestaurant[page + 1]._id)
            const kitchenItems = res.data.data
            console.log(kitchenItems)
            setItems(kitchenItems.items)
        }

    }

    const pageMinus = async () => {
        setPage(page - 1)
        setRestaurant(allRestaurant[page - 1])
        if (allRestaurant[page - 1]) {
            const res = await getAllKitchenItems(allRestaurant[page - 1]._id)
            const kitchenItems = res.data.data
            console.log(kitchenItems)
            setItems(kitchenItems.items)
        }
    }


    const setKitchenModal = () => {
        setItemModal(!itemModal)
    }


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setItemData((prevItemData) => ({
            ...prevItemData,
            [name]: type === 'checkbox' ? checked : value
        }));
        console.log(itemData)
    };


    const handleKitchenFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await addItemToKitchen(restaurant._id,itemData)
        console.log(res)

        if(res.data.data){
            //adding value to table
            let categoryName = '';
            const foundCategory = categories.find(category => itemData.category === category._id);
            if (foundCategory) {
                categoryName = foundCategory.category;
            }
            itemData.category = {category: categoryName}
            setItems((prevItems) => [...prevItems,itemData]);

            setItemModal(false);

        }
        
    };


    return (
        <>
            <div className='flex justify-between items-center p-3 border shadow-md bg-white mb-2'>
                <div className=''>
                    <h4 className='text-2xl text-gray-800 font-bold'>{restaurant.restaurantName}</h4>
                    <h5 className='text-xl text-gray-700 font-bold'>{restaurant.landmark}</h5>
                </div>
                <div className='flex gap-4 text-xl text-gray-600 font-bold'>
                    <button onClick={pageMinus} disabled={page == 0}><BsFillArrowLeftSquareFill /></button>
                    <h5>{page + 1}/{allRestaurant.length}</h5>
                    <button onClick={pagePlus} disabled={page == allRestaurant.length - 1}><BsFillArrowRightSquareFill /></button>
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
                                <td className="border-t-0 px-4 align-middle whitespace-nowrap p-4">
                                    {item.itemName}
                                </td>
                                <td className="border-t-0 px-4 align-middle whitespace-nowrap p-4">
                                    {item.category.category}
                                </td>
                                <td className="border-t-0 px-4 align-middle whitespace-nowrap p-4">
                                    ₹{item.price}
                                </td>
                                <td className="border-t-0 px-4 align-middle whitespace-nowrap p-4">
                                    {item.veg ? 'Veg' : 'Non-Veg'}
                                </td>
                                <td className="border-t-0 px-4 align-middle whitespace-nowrap p-4">
                                    {item.isListed ? 'Listed' : 'Unlisted'}
                                </td>
                                <td className="border-t-0 px-4 align-middle whitespace-nowrap p-4">
                                    <button className='bg-green-700 text-white font-bold px-4 py-1 rounded-md mx-1' >Edit</button>
                                    <button className='bg-red-700 text-white font-bold px-4 py-1 rounded-md mx-1' >list</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <div className='flex'>
                <button className='px-3 py-2 my-2 bg-cyan-950 rounded-sm text-white font-bold' onClick={setKitchenModal}>ADD NEW ITEM</button>
            </div>
            <KitchenModal
                itemModal={itemModal}
                setKitchenModal={setKitchenModal}
                categories={categories}
                handleInputChange={handleInputChange}
                itemData={itemData}
                setItemData={setItemData}
                handleFormSubmit={handleKitchenFormSubmit}
            />
        </>
    )
}

export default KitchenTable
