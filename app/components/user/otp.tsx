'use client'
import React, { useState } from 'react'
import { otpVerify } from '@/apis/user';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';


type OtpProps = {
    otpPage: boolean;
    onCloseModel: () => void;
};

const Otp: React.FC<OtpProps> = ({otpPage,onCloseModel}) => {
    const router = useRouter()

    const [otp,setOtp] = useState('')
    const [error,setError] = useState('')


    const handleOtpChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setOtp(e.target.value)
    }


    const handleVerifyOtp = async(e:React.FormEvent<HTMLFormElement>)=>{
        try {
            e.preventDefault()
            if(otp.length != 6 || otp.includes(" ")){
                setError('Enter a valid otp')
            }
            else{
                const res = await otpVerify(otp)
                console.log(res)
                if(res?.data.data){
                    toast("Hello World")
                    router.push('/');
                }
                else{
                    setError(`The OTP you entered doesn't match. Please enter a valid OTP.`)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const closeModel = ()=>{
        onCloseModel();
    }

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
                                    <input onChange={handleOtpChange} value={otp}
                                        type="number"
                                        name="otp"
                                        id="otp"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none  block w-full p-2.5"
                                        placeholder=""
                                    />{
                                        error == '' ?
                                        <p className='text-xs mt-1 text-gray-500'>Your Verification Code has been sent to your mobile, please enter it here to update.</p> :
                                        <p className='text-xs text-red-700 mt-1'>{error}</p>
                                    }
                                </div>


                                <button
                                    className="w-full text-white bg-cyan-700 focus:outline-none  font-medium rounded-sm text-sm px-5 py-2.5 text-center"
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
