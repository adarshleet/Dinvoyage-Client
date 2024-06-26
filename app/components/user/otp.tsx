'use client'
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { otpVerify } from '@/apis/user';
import { otpVerifyVendor } from '@/apis/vendor';
import { useRouter } from 'next/navigation';
import {toast} from 'sonner';
import OtpTimer from './otpTimes';


type OtpProps = {
    otpPage: boolean;
    onCloseModel: () => void;
    user: boolean,
    time:number
};

const Otp: React.FC<OtpProps> = ({ otpPage, onCloseModel, user,time }) => {
    const router = useRouter()

    const [error, setError] = useState('')
    const timerRef = useRef();
    const [otpValues, setOTPValues] = useState<string[]>(['', '', '', '', '', '']);



    const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            if (otpValues.includes('')) {
                setError('Enter a valid otp')
            }
            else {
                if (user) {
                    const otp = otpValues.join('')
                    const res = await otpVerify(otp)
                    console.log(res)
                    if (res?.data.data) {
                        toast.success("Registration Succesfull. Please Login")
                        router.push('/login');
                    }
                    else {
                        setError(`The OTP you entered doesn't match. Please enter a valid OTP.`)
                    }
                }
                else if (!user) {
                    const otp = otpValues.join('')
                    const res = await otpVerifyVendor(otp)
                    console.log(res)
                    if (res?.data.data) {
                        toast.success('Registration Successfull. Please Login')
                        router.push('/vendor');
                    }
                    else {
                        setError(`The OTP you entered doesn't match. Please enter a valid OTP.`)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const closeModel = () => {
        onCloseModel();
    }

    const handleResendOtp = () => {
        console.log('worink')
    }

    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOTPValues = [...otpValues];
            newOTPValues[index] = value;
            setOTPValues(newOTPValues);
            if (value !== '' && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleBackspace = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && index > 0 && otpValues[index] === '') {
            const newOTPValues = [...otpValues];
            newOTPValues[index - 1] = '';
            setOTPValues(newOTPValues);
            const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
            if (prevInput) prevInput.focus();
        }
    };

    return (
        <div>
            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`fixed top-0 left-0 right-0 z-50 justify-center ${otpPage ? 'flex' : 'hidden'} items-center bg-gray-900 bg-opacity-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full`}>
                <div className="relative w-full max-w-md max-h-screen">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="authentication-modal" onClick={closeModel}
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
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-2 text-xl font-bold text-gray-900 ">
                                Verify Mobile Number
                            </h3>
                            <form className="" onSubmit={handleVerifyOtp}>
                                <label htmlFor="" className=''>Enter the OTP sent to you mobile</label>
                                <div className='pt-2 pb-6'>
                                    {/* <input onChange={handleOtpChange} value={otp}
                                        type="number"
                                        name="otp"
                                        id="otp"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-2.5"
                                        placeholder=""
                                    /> */}
                                    {/* <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">
                                        <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="first" maxlength="1" />
                                        <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="second" maxlength="1" />
                                        <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="third" maxlength="1" />
                                        <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxlength="1" />
                                        <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fifth" maxlength="1" />
                                        <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxlength="1" />
                                    </div> */}
                                    <div className="flex flex-row justify-center text-center px-2">
                                        {otpValues.map((value, index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index}`}
                                                className="m-2 border border-gray-600 text-xl h-12 w-12 text-center form-control rounded"
                                                type="text"
                                                maxLength={1}
                                                value={value}
                                                onChange={(event) => handleInputChange(index, event)}
                                                onKeyDown={(event) => handleBackspace(index, event)}
                                            />
                                        ))}
                                    </div>
                                    {
                                        error == '' ?
                                            <p className='text-xs mt-1 text-gray-500'>Your Verification Code has been sent to your mobile, please enter it here to update.</p> :
                                            <p className='text-xs text-red-700 mt-1'>{error}</p>
                                    }
                                </div>

                                <OtpTimer onTimeOut={handleResendOtp} time={time}/>
                                <button
                                    className="w-full text-white bg-cyan-700 focus:outline-none mt-2  font-medium rounded-sm text-sm px-5 py-2.5 text-center"
                                >
                                    Verify OTP
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Otp
