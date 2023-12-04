'use client'
import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '../../components/user/navbar'
import { FiChevronDown, FiChevronUp, FiPlus, FiMinus } from "react-icons/fi";
import { bookingWithWallet, kitchenItems, payment, singleRestaurant } from '@/apis/user';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { BiSolidOffer } from "react-icons/bi";
import { IoWalletSharp } from "react-icons/io5"
import Coupons from '@/app/components/user/coupons';
import Wallet from '@/app/components/user/wallet';


interface restaurantProps {
    params: {
        id: string
    }
}

const page = ({ params }: restaurantProps) => {

    const [showItems, setShowItems] = useState('1')
    const [selectedItems, setSelectedItems] = useState([]);

    const [restaurant, setRestaurant] = useState({})
    const [allItems, setAllItems] = useState([])
    const [guestDetails, setGuestDetails] = useState({})

    const [veg, setVeg] = useState(false);

    const [couponModal,setCouponModal] = useState(false)
    const [subTotalLast,setSubtotalLast] = useState(0)
    const [appliedCoupon,setAppliedCoupon] = useState(null)

    const [walletModal,setWalletModal] = useState(false)
    const [walletUsageFull,setWalletUsageFull] = useState<boolean | null>(null)
    const [walletApplied,setWalletApplied] = useState(false)
    const [walletAmountUsed,setWalletAmountUsed] = useState(0)

    const route = useRouter()

    const toggleSwitch = async () => {
        const response = await kitchenItems(id, !veg)
        const items = response?.data.kitchenAllItems.data
        setAllItems(items)
        setVeg((prev) => !prev);
    };


    const { id } = params

    const router = useRouter()


    useEffect(() => {
        const fetchData = async () => {
            const res = await singleRestaurant(id)
            const restaurant = res?.data.data
            setRestaurant(restaurant)
            const response = await kitchenItems(id, veg)
            const items = response?.data.kitchenAllItems.data
            setAllItems(items)
            const guestDetails = response?.data?.sessionData?.bookingDetails
            if (guestDetails.items) {
                setSelectedItems(guestDetails.items)
            }
            if (!guestDetails) {
                return router.push('/login')
            }
            setGuestDetails(guestDetails)
        }
        fetchData()
    }, [])


    const handleItemClick = (index: string) => {
        setShowItems(index);
        console.log('Clicked item:', index);
    };


    const handleCounterChange = (category: string, item: string, count: number, price: number) => {
        const updatedItems = [...selectedItems];
        const existingItemIndex = updatedItems.findIndex((i) => i.category === category && i.item === item);

        if (existingItemIndex !== -1) {
            if (count === 0) {
                updatedItems.splice(existingItemIndex, 1); // Remove item if count is 0
            } else {
                updatedItems[existingItemIndex] = { category, item, count, price };
            }
        } else if (count > 0) {
            updatedItems.push({ category, item, count, price });
        }

        setSelectedItems(updatedItems);
        if(subTotal<appliedCoupon?.minimumPurchase){
            setAppliedCoupon(null)
        }
        // calculateTotalPrice
    };

    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, item) => total + item.count * item.price, 0);
    };

    let subTotal = calculateTotalPrice()



    




    //convert date
    // const dateString = "2023-11-23T18:30:00.000Z";
    const dateObject = new Date(guestDetails.date);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);




    //payment working
    const makePayment = async () => {
        try {

            const walletAmountUsed = (walletApplied ? Wallet : 0)

            const bookingDetails = {
                ...guestDetails,
                items: selectedItems,
                totalAmount: subTotalLast,
                appliedCoupon,
                walletAmountUsed
            }
            console.log(bookingDetails)

            const stripe = await loadStripe('pk_test_51OEOTHSFAVCVwY62lVqaB5GwF666YpNTLBjIF8KibE3yclRVMS2yiPxXYg4nit60L2bhvrXqY1DREUdI3EvYsVvY00WM1EwgTk');
            const res = await payment(bookingDetails)
            const sessionId = res?.data.data

            const result = stripe?.redirectToCheckout({
                sessionId: sessionId
            })

        } catch (error) {
            console.log(error);
        }
    }


    //coupon handling
    const closeCouponModal = ()=>{
        setCouponModal(false)
    }


    const applyCoupon = (coupon:object)=>{
        if(coupon.minimumPurchase > subTotal){
            return showToast('Purchase amount is less to apply this coupon')
        }
        else{
            setAppliedCoupon(coupon)
            subTotal = subTotal - coupon.maximumDiscount
            const subTotalLast = subTotal - (appliedCoupon?.maximumDiscount || 0) - walletAmountUsed + 100
            setSubtotalLast(subTotalLast)
        }
    }

    const removeCoupon = ()=>{
        setAppliedCoupon(null)
    }

    //toast design
    const showToast = (message:string) => {
        return toast(message, {
          style: {
            borderRadius: '0px',
            padding: '5px',
            fontSize: '.9rem',
            color: '#ffff',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }
        });
    };


    //wallet mangagement
    const closeWalletModal = ()=>{
        setWalletModal(false)
    }


    const applyWallet = (wallet:number)=>{
        console.log(wallet)
        if(subTotal == 0){
            return showToast('Add some items to apply coupon')
        }
        setWalletApplied(true)
        if(subTotal+100 >= wallet){
            setWalletUsageFull(false)
            setWalletAmountUsed(wallet)
            const subTotalLast = subTotal + 100 - (appliedCoupon?.maximumDiscount || 0) - wallet 
            setSubtotalLast(subTotalLast)
        }
        else{
            setWalletUsageFull(true)
            const walletUsed = wallet - (wallet-subTotal-100)
            setWalletAmountUsed(walletUsed)
            const subTotalLast = subTotal + 100 - (appliedCoupon?.maximumDiscount || 0) - walletUsed 
            setSubtotalLast(subTotalLast)
        }
        setWalletModal(false)
    }


    const payWithWallet = async()=>{
        const walletAmountUsed =  subTotal + 100 - (appliedCoupon?.maximumDiscount || 0) 
        const totalAmount = subTotal + 100 - walletAmountUsed

        const bookingDetails = {
            ...guestDetails,
            items: selectedItems,
            totalAmount: subTotal,
            appliedCoupon,
            walletAmountUsed 
        }

        const res = await bookingWithWallet(bookingDetails)
        if(res?.data.data){
            route.push('/bookingConfirmed')
        }
    }


    return (
        <>
            <Toaster position='bottom-center' />
            <header>
                <Navbar />
            </header>
            <main className='flex flex-col items-center py-24 px-4'>
                <div className='flex flex-col md:flex-row justify-center gap-3'>
                    <div className='bg-white md:w-1/2'>
                        <div className='' style={{ maxWidth: '28rem' }}>
                            <img src={restaurant.banners} alt="" />
                        </div>
                        <div className='p-2 flex justify-between'>
                            <div>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 ">{restaurant.restaurantName}</h5>
                                <p className="mb-2 text-sm font-normal text-gray-500">{restaurant.landmark}, {restaurant.locality}</p>
                            </div>
                            <div>
                                <h2 className='font-bold text-lg'>Booking Details</h2>
                                <h5 className='font-semibold text-sm'>Date : {formattedDate}</h5>
                                <h5 className='font-semibold text-sm'>Time : {guestDetails.time}</h5>
                                <h5 className='font-semibold text-sm'>Guests : {guestDetails.guestCount}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white px-6 py-4' style={{ minWidth: '25rem' }}>
                        <div className='flex w-full justify-around border border-gray-300 p-0.5 font-semibold'>
                            <div className='py-2 px-3 flex gap-1 items-center cursor-pointer' onClick={()=>setCouponModal(true)}>
                                <BiSolidOffer className="text-2xl text-gray-600"/> 
                                <h4>Coupons</h4>
                            </div>
                             
                            <div className='py-2 px-3 flex gap-1 items-center cursor-pointer' onClick={()=>setWalletModal(true)}>
                                <IoWalletSharp className="text-2xl text-gray-600"/>
                                <h4>Wallet</h4>
                            </div>
                        </div>
                        <div className='border-b py-4'>
                            {selectedItems.length == 0 ?
                                <h1 className='text-center'>Select the items from the menu</h1>
                                :
                                selectedItems.map((selected, index) => (
                                    <div className='flex justify-between text-sm px-4 py-1' key={index}>
                                        <p>{selected?.item}</p>
                                        <p className='text-center'>x{selected?.count}</p>
                                        <p>₹{selected?.count * selected?.price}</p>
                                    </div>
                                ))}
                        </div>
                        <div className='py-3 border-b border-b-black pb-5'>
                            <div className='flex justify-between text-sm font-semibold px-4 py-1'>
                                <p>Item Total</p>
                                <p>₹{subTotal}</p>
                            </div>
                            {appliedCoupon && 
                            <div className='flex justify-between text-sm font-semibold px-4 py-1'>
                                <p>Coupon Discount</p>
                                <p>-₹{appliedCoupon.maximumDiscount}</p>
                            </div>}
                            
                            <div className='flex justify-between text-sm font-semibold px-4'>
                                <p>Reservation Charge</p>
                                <p>₹100</p>
                            </div>
                            {walletApplied && <div className='flex justify-between text-sm font-semibold px-4'>
                                <p>Wallet used</p>
                                <p>-₹{walletAmountUsed}</p>
                            </div>}
                        </div>
                        <div>
                            <div className='flex justify-between px-4 font-bold text-base py-2'>
                                <p>To Pay</p>
                                {(appliedCoupon || walletApplied) ? 
                                    <p>₹{subTotalLast}</p>
                                    :
                                    <p>₹{subTotal + 100}</p>
                                }
                            </div>
                        </div>
                        {!walletUsageFull && <button className='py-1 my-2 bg-cyan-800 w-full tex-sm text-white font-bold' disabled={selectedItems.length == 0} onClick={makePayment}>PROCEED TO PAYMENT</button>}                        
                        {walletUsageFull == true && <button className='py-1 my-2 bg-cyan-800 w-full tex-sm text-white font-bold' disabled={selectedItems.length == 0} onClick={payWithWallet}>PAY WITH WALLET</button>}
                    </div>
                </div>


                <div className='flex flex-col justify-center'>
                    <div className="flex items-start mt-16">
                        <span className="mr-2 font-bold">VEG ONLY</span>
                        <label
                            className={`${veg ? 'bg-orange-600' : 'bg-gray-300'
                                } relative inline-flex items-center h-6 rounded-md w-11 cursor-pointer`}
                        >
                            <input
                                type="checkbox"
                                className="hidden "
                                onChange={toggleSwitch}
                                checked={veg}
                            />
                            <span
                                className={`${veg ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block w-4 h-4 transform bg-white rounded-sm `}
                            />
                        </label>
                    </div>
                    <div className='mb-16 mt-3 py-4 bg-white w-full'>
                        <h3 className='text-center font-bold text-xl px-36 md:px-80'>SELECT YOUR TASTE</h3>
                        {allItems.map((item, index) => (
                            <div className='border-b-8 border-gray-200' key={index}>
                                <div className='py-2 px-2'>
                                    <div className='text-lg font-bold px-2 flex justify-between items-center cursor-pointer' onClick={() => handleItemClick(index)}>
                                        <h3 className='capitalize'>{item?.category} ({item?.items.length})</h3>
                                        <h1 className='text-2xl'>{index == showItems ? <FiChevronUp /> : <FiChevronDown />}</h1>
                                    </div>
                                </div>
                                <div className='px-4'>
                                    {index == showItems && item.items.map((item, innerIndex) => (
                                        <div className='pb-6 pt-3 border-b-2 mb-3 flex justify-between' key={innerIndex + item}>
                                            <div>
                                                <h5 className='text-base font-semibold text-gray-800'>{item.itemName}</h5>
                                                <p>₹{item.price}</p>
                                                <div className='mt-2 max-w-3xl'>
                                                    <p className='text-sm text-gray-500 whitespace-normal'>{item.description}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='relative'>
                                                    <div className='w-32 m-2 h-24 rounded-md shadow-lg border  overflow-hidden'>
                                                        <img className="w-full h-full object-cover" src={item.image ? item.image : "https://www.thespruceeats.com/thmb/XDBL9gA6A6nYWUdsRZ3QwH084rk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-chicken-biryani-recipe-7367850-hero-A-ed211926bb0e4ca1be510695c15ce111.jpg"} alt="" />
                                                    </div>
                                                    <div className='flex items-center bg-white rounded-sm shadow-md border w-24 absolute top-20 left-6 justify-center py-1 px-2'>
                                                    {!selectedItems.find((i) => i.category === index && i.item === item.itemName)?.count ?
                                                        <button className='px-7 font-bold text-orange-600 ' onClick={() => handleCounterChange(index, item.itemName, (selectedItems.find((i) => i.category === index && i.item === item.itemName)?.count || 0) + 1, item.price)}>Add</button>
                                                        :
                                                        <>
                                                            <button
                                                                className='px-2 py-1 text-gray-800 rounded'
                                                                onClick={() => handleCounterChange(index, item.itemName, Math.max((selectedItems.find((i) => i.category === index && i.item === item.itemName)?.count || 0) - 1, 0), item.price)}
                                                            >
                                                                <FiMinus />
                                                            </button>
                                                            <h1><span className='mx-2 text-orange-600 font-bold'>{selectedItems.find((i) => i.category === index && i.item === item.itemName)?.count || 0}</span></h1>
                                                            <button
                                                                className='px-2 py-1 text-gray-800 rounded'
                                                                onClick={() => handleCounterChange(index, item.itemName, (selectedItems.find((i) => i.category === index && i.item === item.itemName)?.count || 0) + 1, item.price)}
                                                            >
                                                                <FiPlus />
                                                            </button>
                                                        </>
                                                    }
                                                </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>))}
                    </div>
                </div>
            </main>
            {couponModal && <Coupons couponModal={couponModal} closeCouponModal={closeCouponModal} subTotal={subTotal} applyCoupon={applyCoupon} appliedCoupon={appliedCoupon} removeCoupon={removeCoupon}/>}
            {walletModal && <Wallet walletModal={walletModal} closeWalletModal={closeWalletModal} applyWallet={applyWallet}/>}
        </>
    )
}

export default page
