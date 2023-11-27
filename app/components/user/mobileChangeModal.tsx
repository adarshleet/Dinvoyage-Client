import { changeMobile, verifyNewMobile } from '@/apis/user'
import React, { useState } from 'react'

interface User{
    name : string
    mobile ?: string
    email ?: string
}

interface mobileProps {
    setMobileModal: (mobile: boolean) => void
    mobileModal: boolean
    currentMobile: string | number
    toaster: (message: string) => void
    user : User | undefined
    setUser : (user:User)=>void
}

const MobileChangeModal = ({ setMobileModal, mobileModal, currentMobile, toaster,user,setUser }: mobileProps) => {

    const [mobile, setMobile] = useState<number | string>('')
    const [otpInput, setOtpInput] = useState(false)
    const [otp,setOtp] = useState<number | string>('')

    const sendOtp = async () => {
        try {
            if (mobile == Number(currentMobile)) {
                return toaster('New mobile should not be same as old')
            }

            const res = await verifyNewMobile(mobile)
            const status = res?.data
            console.log(status)
            if (status.data) {
                setOtpInput(true)
            }
            else{
                return toaster(status.message)
            }

        } catch (error) {
            console.log(error)
        }
    }


    const VerifyOtp = async()=>{
        try {
            if(otp.toString().trim().length != 6){
                return toaster('Please enter a valid otp')
            }
            const res = await changeMobile(otp,mobile)
            const status = res?.data.data
            if(status){
                toaster('Mobile number changed successfully')
                setMobileModal(false)
                setOtp('')
                setMobile('')
                setOtpInput(false)
                setUser({...user,mobile:mobile})
            }
            else{
                return toaster('Please enter a valid otp')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const closeModal = ()=>{
        setOtpInput(false)
        setOtp('')
        setMobile('')
        setMobileModal(false)
    }

    return (
        <>

            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`overflow-y-auto overflow-x-hidden fixed ${mobileModal ? 'flex' : 'hidden'} top-0 right-0 left-0 bg-gray-900 bg-opacity-50 z-50 justify-center items-center w-full inset-0 max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-md shadow ">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Change mobile number
                            </h3>
                            <button
                                type="button"
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                                data-modal-hide="authentication-modal"
                                onClick={closeModal}
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
                        <div className="p-4 md:p-5">
                            <div className="space-y-4">
                                <div>

                                    <input
                                        type="number"
                                        name="mobile"
                                        id="mobile"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md outline-none block w-full p-2.5 "
                                        placeholder="Enter new mobile number"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                </div>
                                {otpInput &&
                                    <div>
                                        <input
                                            type="number"
                                            name="otp"
                                            id="otp"
                                            placeholder="Enter the otp"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            value={otp}
                                            onChange={(e)=>setOtp(e.target.value)}
                                        />
                                    </div>}

                                {otpInput ?
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-slate-700 font-bold  rounded-md text-base px-5 py-2.5 text-center"
                                        onClick={VerifyOtp}
                                    >
                                        Verify Otp
                                    </button>
                                    :
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-slate-700 font-bold  rounded-md text-base px-5 py-2.5 text-center"
                                        onClick={sendOtp}
                                    >
                                        Request Otp
                                    </button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default MobileChangeModal
