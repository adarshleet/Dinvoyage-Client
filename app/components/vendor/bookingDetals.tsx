'use client'
import React, { useEffect, useState } from 'react';
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { selectedCuisinesAndFacilities } from '@/apis/vendor';
import { allBookingDetails, bookingCancellation } from '@/apis/vendor';
import BookingCancelModal from './bookingCancelModal';
import { toast } from 'sonner';
import Image from 'next/image';
import noBooking from '../../../public/no-booking.png'

interface booking{
    _id: string;
    name: string;
    mobile: string;
    date: string;
    time: string;
    guestCount: number;
    special: string;
    orderStatus: number;
    cancelReason: string;
    items:BookingItem[]
    totalAmount : number
}

interface BookingItem {
    item: string;
    count: number;
    price: number;
}

const BookingDetals = () => {
    const [restaurant, setRestaurant] = useState<any>({});
    const [allRestaurant, setAllRestaurant] = useState<any>([]);
    const [bookings, setBookings] = useState<booking[]>([])
    const [page, setPage] = useState(0);

    const [modal, setModal] = useState(false)
    const [cancelBookingId, setCancelBookingId] = useState('')
    const [cancelReason, setCancelReason] = useState('')

    const [pagination, setPagination] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await selectedCuisinesAndFacilities();

                if (res?.data) {
                    const restaurantData = res.data.data;
                    setAllRestaurant(restaurantData);
                    setRestaurant(restaurantData[page]);
                    if (restaurantData[page]) {
                        const res = await allBookingDetails(restaurantData[page]._id,pagination)
                        const bookings = res?.data?.data
                        setBookings(bookings.allBookingDetails)
                        setCurrentPage(bookings.currentPage)
                        setTotalPages(bookings.totalPages)
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [pagination,page]);

    const pageMinus = async () => {
        setPagination(1)
        setPage((prevPage) => Math.max(prevPage - 1, 0));
        if (allRestaurant[page - 1]) {
            setRestaurant(allRestaurant[page-1])
            const res = await allBookingDetails(allRestaurant[page - 1]._id,pagination)
            const bookings = res?.data?.data
            setBookings(bookings.allBookingDetails)
            setCurrentPage(bookings.currentPage)
            setTotalPages(bookings.totalPages)
        }
    };

    const pagePlus = async () => {
        setPagination(1)
        setPage((prevPage) => Math.min(prevPage + 1, allRestaurant.length - 1));
        if (allRestaurant[page + 1]) {
            setRestaurant(allRestaurant[page+1])
            const res = await allBookingDetails(allRestaurant[page + 1]._id,pagination)
            const bookings = res?.data?.data
            setBookings(bookings.allBookingDetails)
            setCurrentPage(bookings.currentPage)
            setTotalPages(bookings.totalPages)
        }
    };



    const calculateRemainingHours = (dateString: string, givenTime: string) => {
        const timeZoneOffset = 5.5; // Adjust this based on the required time zone offset

        const [rawHours, minute, AmPm] = givenTime.split(/:|\s/);
        const hour = (parseInt(rawHours, 10) % 12 + (AmPm.toUpperCase() === 'PM' ? 12 : 0)).toString().padStart(2, '0');
        const formattedTime = `${hour}:${minute}`;

        const datePart = dateString.split('T')[0];
        const newDateString = `${datePart}T${formattedTime}:00.000Z`;

        const currentDateUTC = new Date();
        const currentDateLocal = new Date(currentDateUTC.getTime() + timeZoneOffset * 60 * 60 * 1000);

        // const timeDifferenceInHours = (new Date(newDateString) - currentDateLocal) / (1000 * 60 * 60);
        const timeDifferenceInHours = (new Date(newDateString).getTime() - currentDateLocal.getTime()) / (1000 * 60 * 60);


        if (timeDifferenceInHours < 3) {
            return false
        }
        else {
            return true
        }
    }

    const dateConversion = (date: string) => {
        const dateObject = new Date(date);

        // Adjust the date to local time
        dateObject.setMinutes(dateObject.getMinutes() + dateObject.getTimezoneOffset());

        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(dateObject);

        console.log(formattedDate);

        return (formattedDate);
    }

    //booking cancellation
    const openModal = (bookingId: string) => {
        setModal(true)
        setCancelBookingId(bookingId)
    }

    const closeModal = () => {
        setModal(false)
        setCancelBookingId('')
    }


    const handleConfirmCancel = async () => {
        try {
            if (cancelReason == '') {
                return toast.error('Enter the reason for cancellation')
            }
            const res = await bookingCancellation(cancelBookingId, cancelReason)
            if (res?.data.data) {
                setBookings((prevBookings) => {
                    const updatedBookings = prevBookings.map((booking) =>
                        booking._id === cancelBookingId
                            ? { ...booking, orderStatus: 2 }
                            : booking
                    );
                    return updatedBookings;
                });
                toast.success('Booking Cancellation Successfull')
                setModal(false)
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='w-full bg-slate-700 pb-10 p-3 rounded-md mb-16 relative'>
                <h1 className='font-bold text-white text-center mb-2'>BOOKINGS</h1>
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
            {

                bookings && bookings.length ? (
                    <>
                        {bookings.map((booking, index) => (

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 p-3 border-2 shadow-sm border-black mb-2' key={index}>
                                <div className=''>
                                    <h1 className='text-lg font-bold'>BOOKING DETAILS</h1>
                                    <p className='font-semibold'>ORD{booking._id}</p>
                                    <div className='pt-1 pb-2'>
                                        <p>Name : {booking.name}</p>
                                        <p>Mobile : {booking.mobile}</p>
                                        <p>Date : {dateConversion(booking.date)}</p>
                                        <p>Time : {booking.time}</p>
                                        <p>Guests : {booking.guestCount}</p>
                                        {booking.special != '' &&
                                            <p>Special : {booking.special}</p>
                                        }
                                    </div>
                                    {(calculateRemainingHours(booking.date, booking.time) && booking.orderStatus == 1) &&
                                        <button className='py-2 px-3 bg-red-700 text-white font-bold' onClick={() => openModal(booking._id)}>CANCEL BOOKING</button>
                                    }
                                    {booking.orderStatus > 1 &&
                                        <div className='p-2 shadow-lg border-1 border'>
                                            <div className='flex gap-2 font-bold'>
                                                <p>Status :</p>
                                                {booking.orderStatus === 2 ? (
                                                    <p className='font-bold text-red-600'>Cancelled By Vendor</p>
                                                ) : booking.orderStatus === 3 ? (
                                                    <p className='font-bold text-red-600'>Cancelled By User</p>
                                                ) : booking.orderStatus === 4 ? (
                                                    <p className='font-bold text-green-600'>Booking Accomplished</p>
                                                ) :
                                                    null}
                                            </div>
                                            {[2, 3].includes(booking.orderStatus) && (
                                                <div className='flex gap-2'>
                                                    <p className='font-bold'>Reason :</p>
                                                    <p>{booking.cancelReason}</p>
                                                </div>
                                            )}
                                        </div>
                                    }
                                </div>
                                <div>
                                    <div className='px-4'>
                                        <div className='pb-3 border-b-2 max-h-32 px-2 overflow-y-scroll'>
                                            {booking.items.map((item, innerIndex:number) => (
                                                <div className='flex justify-between pb-1' key={innerIndex}>
                                                    <p>{item.item}</p>
                                                    <p>x{item.count}</p>
                                                    <p>₹{item.count * item.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='pt-1 px-2'>
                                            <div className='flex justify-between'>
                                                <p>Reservation Charge</p>
                                                <p>₹100</p>
                                            </div>
                                            <div className='flex justify-between font-bold'>
                                                <p>Total</p>
                                                <p>₹{booking.totalAmount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                        <nav aria-label="Page navigation example">
                            <ul className="list-style-none flex mb-10">
                                <li>
                                    <button className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-gray-700 font-bold transition-all duration-300"
                                        onClick={() => setPagination(pagination - 1)}
                                        disabled={pagination == 1}
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
                                        onClick={() => setPagination(pagination + 1)}
                                        disabled={pagination === totalPages}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </>
                ) :
                    <div className='flex flex-col w-full items-center justify-center'>
                        <div className='items-center w-52'>
                            <Image width={250} height={250} src={noBooking} alt="" />
                            <h1 className='text-center text-xl font-bold'>No Bookings Found</h1>
                        </div>
                    </div>
            }
            <BookingCancelModal modal={modal} handleModal={closeModal} cancelReason={cancelReason} setCancelReason={setCancelReason} handleConfirmCancel={handleConfirmCancel} />
        </>
    );
};

export default BookingDetals;
