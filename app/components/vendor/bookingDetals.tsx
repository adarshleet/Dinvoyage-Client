'use client'
import React, { useEffect, useState } from 'react';
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { selectedCuisinesAndFacilities } from '@/apis/vendor';
import { allBookingDetails, bookingCancellation } from '@/apis/admin';
import BookingCancelModal from './bookingCancelModal';
import toast, { Toaster } from 'react-hot-toast';

const BookingDetals = () => {
    const [restaurant, setRestaurant] = useState<any>({});
    const [allRestaurant, setAllRestaurant] = useState<any>([]);
    const [bookings, setBookings] = useState([])
    const [page, setPage] = useState(0);

    const [modal, setModal] = useState(false)
    const [cancelBookingId, setCancelBookingId] = useState('')
    const [cancelReason,setCancelReason] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await selectedCuisinesAndFacilities();

                if (res?.data) {
                    const restaurantData = res.data.data;
                    setAllRestaurant(restaurantData);
                    setRestaurant(restaurantData[page]);
                    if (restaurantData[page]) {
                        const res = await allBookingDetails(restaurantData[page]._id)
                        const bookings = res?.data?.data?.bookings
                        setBookings(bookings)
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page]);

    const pageMinus = async () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
        if (allRestaurant[page - 1]) {
            const res = await allBookingDetails(allRestaurant[page - 1]._id)
            const bookings = res?.data?.data?.bookings
            setBookings(bookings)
            console.log(bookings)

        }
    };

    const pagePlus = async () => {
        setPage((prevPage) => Math.min(prevPage + 1, allRestaurant.length - 1));
        if (allRestaurant[page + 1]) {
            const res = await allBookingDetails(allRestaurant[page + 1]._id)
            const bookings = res?.data?.data?.bookings
            setBookings(bookings)

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

        const timeDifferenceInHours = (new Date(newDateString) - currentDateLocal) / (1000 * 60 * 60);

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


    const handleConfirmCancel = async() => {
        try {
            if(cancelReason == ''){
                return toast.error('Enter the reason for cancellation')
            }
            const res = await bookingCancellation(cancelBookingId,cancelReason)
            if(res?.data.data){
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
            <Toaster position='top-right'/>
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
            {bookings && bookings.length ?
                bookings.map((booking, index) => (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 p-3 border-2 shadow-sm border-black mb-2' key={index}>
                        <div className=''>
                            <h1 className='text-lg font-bold'>BOOKING DETAILS</h1>
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
                                    {booking.items.map((item, innerIndex) => (
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

                    </div>))
                :
                <h1 className='text-center'>No Booking Found</h1>
            }
            <BookingCancelModal modal={modal} handleModal={closeModal} cancelReason={cancelReason} setCancelReason={setCancelReason} handleConfirmCancel={handleConfirmCancel}/>
        </>
    );
};

export default BookingDetals;
