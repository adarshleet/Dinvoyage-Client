'use client'
import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import CouponModal from '@/app/components/admin/couponModal';
import { addCoupon, allCoupons, couponEdit, couponStatusChange } from '@/apis/admin';
import toast from 'react-hot-toast';
import ConfirmPopUp from './confirmPopUp';

interface coupon {
    _id?: string
    couponName: string,
    maximumDiscount: string,
    minimumPurchase: string,
    expiryDate: string
    isListed?: boolean
}

const CouponTable = () => {

    const [couponModal, setCouponModal] = useState(false)
    const [coupon, setCoupon] = useState<coupon>({
        couponName: '',
        maximumDiscount: '',
        minimumPurchase: '',
        expiryDate: ''
    })

    const [allCoupon, setAllCoupon] = useState<coupon[]>([])
    const [page, setPage] = useState(1)
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState<string>('')
    const [confirmPopUp, setConfirmPopup] = useState(false)

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await allCoupons(page)
                const data = res?.data.data
                console.log(data)
                setAllCoupon(data.allCoupons)
            }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }, [page])

    const closeModal = () => {
        setCoupon({
            couponName: '',
            maximumDiscount: '',
            minimumPurchase: '',
            expiryDate: ''
        })
        setCouponModal(false)
    }

    //add coupon
    const handleAddCoupon = async () => {
        console.log(coupon)
        if (coupon.couponName.trim().length < 5) {
            return toast.error('Enter a valid coupon name')
        }
        else if (coupon.expiryDate.length == 0) {
            return toast.error('Enter the expiry date')
        }
        else if (parseInt(coupon.minimumPurchase) < 100) {
            return toast.error('Minimum purchase should not be less than 100')
        }
        else if (parseInt(coupon.maximumDiscount) < 50) {
            return toast.error('Minimum purchase should not be less than 50')
        }
        else if (parseInt(coupon.minimumPurchase) <= parseInt(coupon.maximumDiscount)) {
            return toast.error('Maximum discount should not be greater than minimum purchase')
        }



        if (edit) {
            const res = await couponEdit(coupon)
            const data = res?.data.data
            if (data) {
                setAllCoupon((prevCoupons) =>
                    prevCoupons.map((c) => (c._id === coupon._id ? coupon : c) as any)
                );
                setEdit(false)
                setCouponModal(false)
                setCoupon({
                    couponName: '',
                    maximumDiscount: '',
                    minimumPurchase: '',
                    expiryDate: ''
                })
            }
        }
        else {
            const res = await addCoupon(coupon)
            const data = res?.data.data
            console.log(data)
            if (!data.data) {
                return toast.error(data.message)
            }
            else {
                setAllCoupon([...allCoupon, coupon])
                closeModal()
                setCoupon({
                    couponName: '',
                    maximumDiscount: '',
                    minimumPurchase: '',
                    expiryDate: ''
                })
            }
        }

    }

    const convertDate = (date: string) => {
        const dateObject = new Date(date);
        const options: Object = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        return formattedDate
    }


    const editCoupon = (index: number) => {
        setEdit(true)
        setCouponModal(true)
        setCoupon({
            _id: allCoupon[index]?._id,
            couponName: allCoupon[index]?.couponName,
            maximumDiscount: allCoupon[index]?.maximumDiscount,
            minimumPurchase: allCoupon[index]?.minimumPurchase,
            expiryDate: allCoupon[index]?.expiryDate,
            isListed: allCoupon[index]?.isListed
        })
    }


    const statusChange = (couponId: string) => {
        // console.log(couponId)
        setConfirmPopup(true)
        setEditId(couponId)
    }

    const changeStatus = async () => {
        const res = await couponStatusChange(editId)
        if (res?.data.data) {
            setAllCoupon((prevCoupons) =>
                prevCoupons.map((c) => (c._id === editId ? { ...c, isListed: !c.isListed } : c) as any)
            );
            setEditId('')
            setConfirmPopup(false)
        }

    }


    const onCloseModal = () => {
        setEditId('')
        setConfirmPopup(false)
    }


    return (
        <>
            <div className=''>
                {/* component */}
                <section className="container mx-auto ">
                    <div className="w-full mb-4 overflow-hidden rounded-lg shadow-lg">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-200 uppercase border-b border-gray-600">
                                        <th className="px-4 py-3">Coupon Name</th>
                                        <th className="px-4 py-3">Maximum Discount</th>
                                        <th className="px-4 py-3">Minimum Purchase</th>
                                        <th className="px-4 py-3">Expiry Date</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {allCoupon.map((coupon, index) => (
                                        <tr className="text-gray-700" key={index}>
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm">

                                                    <div>
                                                        <p className="font-semibold text-black">{coupon.couponName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-semibold border">₹{coupon.maximumDiscount}</td>
                                            <td className="px-4 py-3 text-sm font-semibold border">₹{coupon.minimumPurchase}</td>


                                            <td className="px-4 py-3 text-sm border">{convertDate(coupon.expiryDate)}</td>
                                            <td className="px-4 py-3 text-xs border">
                                                <span className={`px-2 py-1 font-semibold leading-tight ${coupon.isListed ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-sm`}>
                                                    {" "}
                                                    {coupon.isListed ? 'Listed' : 'unlisted'}{" "}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm gap-3">
                                                    <button className="font-semibold text-black" onClick={() => editCoupon(index)}><FaEdit className="text-base" /></button>
                                                    <button className="font-semibold text-black" onClick={() => statusChange(coupon._id as string)}><IoIosEye className="text-xl" /></button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <div className='flex justify-between'>
                    <div>
                        .
                    </div>
                    <div>
                        <button className='py-1 px-2 text-sm bg-slate-900 font-bold text-white' onClick={() => setCouponModal(true)}>ADD COUPON</button>
                    </div>
                </div>

            </div>
            {couponModal && <CouponModal closeModal={closeModal}
                edit={edit}
                coupon={coupon}
                setCoupon={setCoupon}
                handleAddCoupon={handleAddCoupon}
            />}
            {confirmPopUp && <ConfirmPopUp id={editId} onCloseModel={onCloseModal} confirmPopUp={confirmPopUp} changeStatus={changeStatus} />}
        </>

    )
}

export default CouponTable
