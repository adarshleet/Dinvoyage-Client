'use client'
import { cancelBooking, userBookings } from '@/apis/user'
import React, { useEffect, useState } from 'react'
import BookingCancellationModal from './bookingCancellationModal'
import toast from 'react-hot-toast'

const Bookings = () => {

    const [bookings, setBookings] = useState([])
    const [selected,setSelected] = useState(null)

    const [modal,setModal] = useState(false)
    const [cancelBookingId,setCancelBookingId] = useState('')
    const [cancelReason,setCancelReason] = useState('')

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await userBookings()
                console.log(res?.data.data)
                setBookings(res?.data.data)
            }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }, [])

    const transformedResult = bookings.map((item) => ({
        ...item,
        restaurant: item.restaurantId, // Rename 'restaurantId' to 'restaurant'
        bookings: item.bookings.map((booking) => ({
            ...booking,
            restaurant: item.restaurantId, // Embed restaurant details in each booking
        })),
    }));

    const bookingsArray = transformedResult.flatMap((item) => item.bookings);

    const sortedBookingsArray = bookingsArray.sort((b, a) => new Date(a.date) - new Date(b.date));



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
        return (formattedDate);
    }

    console.log(bookings)


    //cancellation modal
    const openModal = (bookingId:string)=>{
        setModal(true)
        setCancelBookingId(bookingId)
    }

    const closeModal = ()=>{
        setModal(false)
        setCancelBookingId('')
    }

    const handleConfirmCancel = async()=>{
        if(cancelReason.trim().length < 5){
            return toast('Enter the reason for canellation', {
                style: {
                  borderRadius: '0px',
                  padding: '5px',
                  fontSize: '.9rem',
                  color: '#ffff',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }
            });
        }

        const res = await cancelBooking(cancelBookingId,cancelReason)
        console.log(res?.data.data)
        if(res?.data.data){
            setBookings((prevBookings) => {
                // Map over the previous bookings array
                const updatedBookings = prevBookings.map((restaurant) => {
                  // For each restaurant, map over its bookings array
                  const updatedBookings = restaurant.bookings.map((booking) =>
                    // Check if the current booking's _id matches the cancelBookingId
                    booking._id === cancelBookingId
                      ? { ...booking, orderStatus: 3 } // Update the orderStatus to 2 for the matching booking
                      : booking // If not matching, keep the booking unchanged
                  );
              
                  // Update the bookings array for the current restaurant
                  return { ...restaurant, bookings: updatedBookings };
                });
              
                return updatedBookings; // Return the updated array
              });
              return toast('Booking Cancelled', {
                style: {
                  borderRadius: '0px',
                  padding: '5px',
                  fontSize: '.9rem',
                  color: '#ffff',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }
            });
            closeModal()

        }
    }


    return (
        <>
        <div className='p-6 w-full'>
            <div className='overflow-y-scroll' style={{ maxHeight: '30rem' }}>
                {sortedBookingsArray.map((booking, index) => (
                    <div className='border-2 p-6 w-full mb-2' key={index}>
                        <div className='flex justify-between border-b pb-4'>
                            <div className='flex flex-col md:flex-row'>
                                <div className='w-36'>
                                    <img src={booking.restaurant.banners} alt="" />
                                </div>
                                <div className='md:px-2'>
                                    <h5 className='font-bold'>{booking.restaurant.restaurantName}</h5>
                                    <h5 className='text-sm'>{booking.restaurant.locality}</h5>

                                    {(calculateRemainingHours(booking.date, booking.time) && booking.orderStatus == 1) &&
                                        <button className='py-1 px-2 bg-red-700 text-white font-bold text-sm mt-1' onClick={()=>openModal(booking._id)}>CANCEL</button>
                                    }


                                </div>
                            </div>
                            <div className='text-sm text-gray-500'>
                                <p>{booking.name}</p>
                                <p>{booking.mobile}</p>
                                <p>{dateConversion(booking.date)}</p>
                                <p>{booking.time}</p>
                            </div>
                        </div>
                        {index === selected ?
                        <>
                            <div className='text-sm py-2'>
                            {booking.items.map((item, index) => (
                                <div className='flex justify-between' key={index}>
                                    <p>{item.item} x{item.count}</p>
                                    <p>₹{item.price}</p>
                                </div>
                            ))}
                            <div className='flex justify-between'>
                                <p>Reservation Charge</p>
                                <p>₹100</p>
                            </div>
                            <div className='flex justify-between font-bold pt-2'>
                                <p>Total</p>
                                <p>₹{booking.totalAmount}</p>
                            </div>
                        </div>
                        {booking.orderStatus > 1 &&
                            <div className=''>
                                <div className='flex gap-2 font-bold text-sm'>
                                    <p>Status :</p>
                                    {booking.orderStatus === 2 ? (
                                        <p className='font-bold text-red-600'>Cancelled By Vendor</p>
                                    ) : booking.orderStatus === 3 ? (
                                        <p className='font-bold text-red-600'>Cancelled</p>
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
                            </div>}
                        </>
                        :
                        <button className='text-sm mt-1' onClick={()=>setSelected(index)}>View Details</button>
                        }
                    </div>))}

            </div>
        </div>
        <BookingCancellationModal modal={modal} closeModal={closeModal} cancelReason={cancelReason} setCancelReason={setCancelReason} handleConfirm={handleConfirmCancel}/>
        </>
    )
}

export default Bookings
