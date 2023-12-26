'use client'
import { changeMobile, verifyMobile } from '@/apis/vendor'
import React, { Dispatch, SetStateAction, useState } from 'react'


interface Vendor {
    name : string;
    email?: string;
    mobile: string
}

interface passwordProps{
    toaster : (message:string)=>void
    setMobileModal : (change:boolean)=>void
    vendor : object
    setVendor : Dispatch<SetStateAction<Vendor>>;
}

const MobileChange = ({toaster,setMobileModal,vendor,setVendor}:passwordProps) => {

    const [otpInput,setOtpInput] = useState(false)
    const [mobile,setMobile] = useState<string | number>('')
    const [otp,setOtp] = useState<string | number>('')

    const requestOtp = async()=>{
        try {
            const res = await verifyMobile(mobile)
            const status = res?.data.data
            if(status){
                setOtpInput(true)
            }
            else{
                toaster('Already existing mobile number')
            }
        } catch (error) {
            console.log(error)
        }
    }


    const changeVendorMobile = async()=>{
        try {

            if(otp.toString().trim().length != 6){
                return toaster('Invalid Otp')
            }

            const res = await changeMobile(mobile,otp)
            const status = res?.data.data
            if(status){
                setMobileModal(false)
                // setVendor({...vendor,mobile:mobile})
                setVendor((prevVendor) => ({ ...prevVendor, mobile: String(mobile), name: prevVendor.name || '' }));
                toaster('Mobile number changed successfully')
            }
            else{
                toaster('Enter a valid otp')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center mb-6'>
            <div className='bg-white p-5 w-full lg:w-1/3 bg-opacity-70'>
                <h3 className='text-lg text-center font-bold mb-3'>Change Mobile Number</h3>
                <div>
                    <input type="number" value={mobile} onChange={(e)=>setMobile(e.target.value)}  className='pt-4 pb-1 px-2 my-2 w-full bg-opacity-0 bg-transparent outline-none border-b-2 border-b-gray-500 text-gray-600' placeholder='Enter the mobile number'/>
                </div>
                {otpInput && 
                <div>
                    <input type="number" value={otp} onChange={(e)=>setOtp(e.target.value)}  className='pt-4 pb-1 px-2 my-2 w-full bg-opacity-0 bg-transparent outline-none border-b-2 border-b-gray-500 text-gray-600' placeholder='Enter the Otp'/>
                </div>}
                {otpInput ? 
                <button className='w-full py-2 px-1 bg-gray-800 mt-5 text-white font-bold' onClick={changeVendorMobile}>Confirm Change Mobile</button>
                :
                <button className='w-full py-2 px-1 bg-gray-800 mt-5 text-white font-bold' onClick={requestOtp}>Request Otp</button>
                }
            </div>
        </div>
    )
}

export default MobileChange
