'use client'
import { couponsToShow } from '@/apis/user';
import React, { useEffect, useState } from 'react'
import { BiSolidCoupon } from "react-icons/bi";


interface couponProps{
    couponModal: boolean
    closeCouponModal : ()=>void
    subTotal : number
    applyCoupon : (coupon:object)=>void
    appliedCoupon : object | null
    removeCoupon : ()=>void
}

const Coupons = ({couponModal,closeCouponModal,subTotal,applyCoupon,appliedCoupon,removeCoupon}:couponProps) => {

    const [coupons,setCoupons] = useState([])
    

    useEffect(()=>{
        try {
            const fetchData = async()=>{
                const res = await couponsToShow()
                const coupons = res?.data.data
                setCoupons(coupons)
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    },[])

    
    return (
        <>
            
            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`overflow-y-auto ${couponModal ? 'flex' : 'hidden'} overflow-x-hidden fixed bg-gray-800 bg-opacity-50 top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-sm shadow ">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-500">
                                AVAILABLE COUPONS
                            </h3>
                            <button
                                type="button"
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                data-modal-hide="authentication-modal"
                                onClick={closeCouponModal}
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
                        <div className="p-4 md:p-5 max-h-96 overflow-y-scroll">
                            {!coupons.length ?   
                            
                            <h3 className='text-center'>Sorry.. No Coupon Available This Time</h3>

                            :
                            coupons.map((coupon,index)=>(
                                <div className='p-2 border mb-3'key={index}>
                                <div className='py-1 bg-yellow-100 px-2 border font-bold text-sm text-center flex w-1/2 items-center gap-2'>
                                    <BiSolidCoupon className="text-2xl"/>
                                    <h1>{coupon.couponName}</h1>
                                </div>
                                <div className='py-2 font-semibold'>
                                    <h5>Get ₹{coupon.maximumDiscount} discount on minimum purchase of ₹{coupon.minimumPurchase}</h5>
                                </div>
                                {(appliedCoupon && appliedCoupon?.couponName == coupon?.couponName) ?
                                    <button className='py-1 px-2 border text-sm text-red-600 border-red-600' onClick={removeCoupon}>REMOVE COUPON</button>
                                :
                                    <button className='py-1 px-2 border text-sm text-orange-400 border-orange-400' onClick={()=>applyCoupon(coupon)}>APPLY COUPON</button>
                                }
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Coupons
