import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { startOfDay, addDays, isBefore, isAfter } from 'date-fns';
import { DayPicker, Row, RowProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function CurrentWeekRow(props: RowProps) {
    return <Row {...props} />;
}

const RestaurantBooking = () => {

    const [guestCount, setGuestCount] = useState(0)
    const [showTimeSlot, setShowTimeSlots] = useState('breakfast')
    const [timeSelect, setTimeSelect] = useState('')

    const today = startOfDay(new Date());
    const endOfNext14Days = addDays(today, 13);

    const [selected, setSelected] = React.useState<Date>();

    // console.log(selected?.toLocaleString('en-US', { timeZone: 'UTC' }))
    const localISOString = selected?.toISOString();
    console.log(localISOString ? new Date(localISOString).toLocaleString() : undefined);
    console.log(timeSelect)

    const guestCountPlus = () => {
        if (guestCount == 15) {
            return toast('You can only select maximum of 15 people', {
                style: {
                    borderRadius: '0px',
                    padding: '5px',
                    fontSize: '.9rem',
                    color: '#ffff',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }
            });
        }
        setGuestCount(guestCount + 1)
    }

    const guestCountMinus = () => {
        if (guestCount == 0) {
            return
        }
        setGuestCount(guestCount - 1)
    }

    const startTime = '10:00 AM'
    const endTime = '11:00 PM'
    function timeGenerate(startTime, endTime) {
        const timeSlots = [];

        // Parse start and end times into Date objects
        const start = new Date(`2023-01-01 ${startTime}`);
        const end = new Date(`2023-01-01 ${endTime}`);

        // Loop to generate time slots with 30 minutes difference
        let current = start;
        while (current < end) {
            // Format the current time and push it to the timeSlots array
            timeSlots.push(
                current.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })
            );

            // Add 30 minutes to the current time
            current = new Date(current.getTime() + 30 * 60 * 1000);
        }

        return timeSlots;
    }

    const LunchTime = '12:00 PM'
    const dinnerTime = '5:00 PM'

    const breakFastTimeSlots = timeGenerate(startTime, LunchTime);
    const lunchTimeSlots = timeGenerate(LunchTime, dinnerTime)
    const dinnerTimeSlots = timeGenerate(dinnerTime, endTime)




    return (
        <>
        <div className='py-8 grid grid-cols-1 md:grid-cols-2 items-end gap-2 md:gap-5'>
            <div>
                <h4 className='font-bold'>Select Guest/s</h4>
                <p className='text-sm'>Choose the number of guest/s going</p>
                <div className='py-2 px-3 bg-white my-1 flex items-center gap-3'>
                    <h4 className='font-bold'>Guests</h4>
                    <div className='flex gap-2 font-bold'>
                        <button onClick={guestCountMinus}><FaMinusCircle /></button>
                        <p>{guestCount}</p>
                        <button onClick={guestCountPlus}><FaPlusCircle /></button>
                    </div>
                </div>
            </div>
            <div className='my-1 w-full'>
                <p className='text-sm'>Enter The Name</p>
                <input className='py-2 px-3 w-full focus:outline-none border focus:border-gray-400' type="text" />
            </div>
            <div className='my-1 w-full'>
                <p className='text-sm'>Enter The Mobile</p>
                <input className='py-2 px-3 w-full focus:outline-none border focus:border-gray-400' type="text" />
            </div>
            <div className='my-1 w-full'>
                <p className='text-sm'>Any Special Request (optional)</p>
                <input className='py-2 px-3 w-full focus:outline-none border focus:border-gray-400' type="text" />
            </div>
        </div>
        <div className='flex flex-col md:flex-row bg-white p-3'>
            <div className='my-1 w-full'>
                <p className='text-sm px-3'>Select Date</p>
                <div className='flex justify-center md:justify-start'>
                    {/* <Calendar /> */}
                    <DayPicker
                        components={{ Row: CurrentWeekRow }}
                        showOutsideDays
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        disabled={(date) => isBefore(date, today) || isAfter(date, endOfNext14Days)}
                    />
                </div>
            </div>
            <div className='my-1 w-full'>
                <p className='text-sm'>Select Time</p>
                <div className='p-2 bg-white' style={{ minHeight: '18rem' }}>
                    <div className='flex justify-around py-2 font-bold'>
                        <button className={`pt-2 pb-2 px-3 ${showTimeSlot == 'breakfast' && 'border-blue-500 border-b-4 pb-0 text-blue-500'}`} onClick={() => setShowTimeSlots('breakfast')}>BreakFast</button>
                        <button className={`pt-2 pb-2 px-3 ${showTimeSlot == 'lunch' && 'border-blue-500 text-blue-500 pb-0 border-b-4'}`} onClick={() => setShowTimeSlots('lunch')}>Lunch</button>
                        <button className={`pt-2 pb-2 px-3 ${showTimeSlot == 'dinner' && 'border-blue-500 text-blue-500 pb-0 border-b-4'}`} onClick={() => setShowTimeSlots('dinner')}>Dinner</button>
                    </div>
                    <div className='p-5 grid grid-cols-3 gap-3 text-center'>
                        {showTimeSlot == 'breakfast' && breakFastTimeSlots.map((time, index) => (
                            <div key={index} className={`${timeSelect == time ? 'bg-blue-500 text-white font-bold' : 'bg-gray-200'} px-2 py-1  cursor-pointer`}  onClick={() => setTimeSelect(time)}>
                                <p>{time}</p>
                            </div>
                        ))}
                        {showTimeSlot == 'lunch' && lunchTimeSlots.map((time, index) => (
                            <div key={index} className={`${timeSelect == time ? 'bg-blue-500 text-white font-bold' : 'bg-gray-200'} px-2 py-1  cursor-pointer`} onClick={() => setTimeSelect(time)}>
                                <p>{time}</p>
                            </div>
                        ))}
                        {showTimeSlot == 'dinner' && dinnerTimeSlots.map((time, index) => (
                            <div key={index} className={`${timeSelect == time ? 'bg-blue-500 text-white font-bold' : 'bg-gray-200'} px-2 py-1  cursor-pointer`} onClick={() => setTimeSelect(time)}>
                                <p>{time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className='my-16 py-4 bg-white'>
            <h3 className='text-center font-bold text-xl'>SELECT YOUR TASTE</h3>
            <div>
                <div className='py-2'>
                    <div className='py-3 text-lg font-bold px-3 border-b-8 border-gray-200'>
                        <h3>Classic Bowls (7)</h3>
                    </div>
                </div>
                <div className='px-4'>
                    <div className='pb-6 pt-3 border-b-2'>
                        <h5 className='text-lg font-semibold text-gray-800'>Paneer Tikka Mac & Cheese Pasta Bowl</h5>
                        <p>₹279</p>
                        <div className='mt-2 max-w-3xl'>
                            <p className='text-sm text-gray-500 whitespace-normal'>Delicious Mac and Cheese got a tikka twist and we dont complain. Creamy Mac and Cheese in spicy mughlai gravy topped with soft paneer tikka and garnished with salad</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default RestaurantBooking
