'use client'
import React, { Dispatch, SetStateAction } from 'react'
import { FaWindowClose } from "react-icons/fa";

interface Coupon{
    couponName:string,
    maximumDiscount : string,
    minimumPurchase : string,
    expiryDate : string
}

interface CouponProps{
    closeModal : ()=>void
    coupon : Coupon
    setCoupon : Dispatch<SetStateAction<Coupon>>,
    handleAddCoupon : ()=>void
    edit:boolean
}


const CouponModal = ({closeModal,coupon,setCoupon,handleAddCoupon,edit}:CouponProps) => {
    return (
        <>
            {/* Code block starts */}
            <>
                <div
                     tabIndex={-1}
                     aria-hidden="true"
                    className="bg-gray-900 bg-opacity-60 overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0  max-h-full"
                    id="modal"
                >
                    <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        
                            <div className='flex justify-end w-full items-center'>
                                <button onClick={closeModal}><FaWindowClose className="text-2xl text-red-700"/></button>
                            </div>
                            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4 text-lg">
                                    {edit ? 'Edit Coupon' : 'Add Coupon'}
                                </h1>
                            <div className='grid grid-cols-2 gap-4 mb-4'>

                                <input
                                    id="name"
                                    className=" mt-2 text-gray-600 focus:outline-none focus:border  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Coupon Name"
                                    value={coupon.couponName}
                                    onChange={(e)=>setCoupon({...coupon,couponName:e.target.value})}
                                />
                                <div className=" mt-2">
                                <input
                                    className="text-gray-600 focus:outline-none focus:border  font-normal w-full h-10 flex items-center px-3 text-sm border-gray-300 rounded border"
                                    placeholder="Expiry Date"
                                    type='date'
                                    value={coupon.expiryDate}
                                    onChange={(e)=>setCoupon({...coupon,expiryDate:e.target.value})}
                                />
                            </div>

                            </div>
                            

                            <div className="relative mb-5 mt-2 grid grid-cols-2 gap-4">
                                
                                <input
                                    id="email2"
                                    className="text-gray-600 focus:outline-none focus:border  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Maximum Discount"
                                    value={coupon.maximumDiscount}
                                    onChange={(e)=>setCoupon({...coupon,maximumDiscount : e.target.value})}
                                />
                                <input
                                    id="email2"
                                    className="text-gray-600 focus:outline-none focus:border  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    placeholder="Minimum amount"
                                    value={coupon.minimumPurchase}
                                    onChange={(e)=>setCoupon({...coupon,minimumPurchase:e.target.value})}
                                />
                            </div>
                            
                           
                            <div className="flex items-center justify-start w-full">
                                <button className="focus:outline-none focus:ring-2 w-full font-bold focus:ring-offset-2 transition duration-150 ease-in-out  bg-slate-600 rounded text-white px-8 py-2 text-sm" onClick={handleAddCoupon}>
                                    {edit ? 'UPDATE COUPON DETAILS' : 'ADD COUPON'}
                                </button>
                               
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </>
            {/* Code block ends */}
        </>

    )
}

export default CouponModal
