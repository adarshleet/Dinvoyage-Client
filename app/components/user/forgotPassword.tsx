'use client'
import { forgotPasswordChangeUser, verifyMobile } from '@/apis/user';
import { forgotPasswordChange } from '@/apis/vendor';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdClose } from "react-icons/io";

interface forgotProps {
    forgotModal: boolean,
    closeModal: () => void,
    user: boolean
}

const ForgotPassword = ({ forgotModal, closeModal, user }: forgotProps) => {

    const [otp, setOtp] = useState<number | string>('')
    const [passwordInputs, setPasswordInputs] = useState(false)

    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    })

    const handleOtpSubmit = async () => {
        try {

            if (otp.toString().length !== 6) {
                return toaster('Enter a valid otp')
            }

            // if (user) {
                const res = await verifyMobile(otp)
                const otpVerify = res?.data.data
                if (otpVerify) {
                    setPasswordInputs(true)
                }
                else {
                    return toaster('Enter a valid otp')
                }

            // }
        } catch (error) {
            console.log(error)
        }
    }

    const handlePasswordSubmit = async () => {
        if (passwords.password.trim().length < 8) {
            return toaster('Password length must be 8 letters')
        }
        else if (passwords.confirmPassword.trim() != passwords.password) {
            return toaster('Passwords do not match')
        }

        if(user){
            const res = await forgotPasswordChangeUser(passwords.password)
            if(res?.data.data){
                handleCloseModal()
                toaster('Password Changed Successfully')
            }
        }
        else{
            const res = await forgotPasswordChange(passwords.password)
            if(res?.data.data){
                handleCloseModal()
                toaster('Password Changed Successfully')
            }
        }

    }

    function toaster(message: string) {
        toast(message, {
            style: {
                border: '1px solid #713200',
                fontSize: '.8rem',
                whiteSpace: 'nowrap',
                padding: '10px',
                color: '#ffffff',
                backgroundColor: '#000000',
                borderRadius: 0,
            },
        });
    }


    const handleCloseModal = () => {
        closeModal()
        setPasswordInputs(false)
        setOtp('')
    }


    return (
        <>

            <div
                id="select-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`${forgotModal ? "flex" : 'hidden'} flex-col bg-gray-900 bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full`}
            >

                <div className="relative p-4 w-full max-w-md max-h-full">

                    <div className="relative bg-white rounded-lg shadow ">

                        <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t bg-teal-200">
                            <h3 className="text-xl font-bold text-gray-900 py-2">
                                Forgot Password
                            </h3>
                        </div>
                        {passwordInputs ?
                            <div className="p-4 md:p-5">
                                <input type="password" value={passwords.password} onChange={(e) => setPasswords({ ...passwords, password: e.target.value })} className='py-2 px-2 outline-none border-2 border-gray-300 my-2 w-full' placeholder='Enter the password' />
                                <input type="password" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} className='py-2 px-2 outline-none border-2 border-gray-300 my-2 w-full' placeholder='Confirm the Otp' />
                                <button className="text-white inline-flex w-full justify-center bg-cyan-700 font-bold hover:bg-cyan-800 focus:ring-4 rounded-sm my-2 text-sm px-5 py-3 text-center" onClick={handlePasswordSubmit}>
                                    Change Password
                                </button>
                            </div>
                            :
                            <div className="p-4 md:p-5">
                                <input type="number" value={otp} onChange={(e) => setOtp(e.target.value)} className='py-2 px-2 outline-none border-2 border-gray-300 my-2 w-full' placeholder='Enter the Otp' />

                                <button className="text-white inline-flex w-full justify-center bg-cyan-700 font-bold hover:bg-cyan-800 focus:ring-4 rounded-sm my-2 text-sm px-5 py-3 text-center" onClick={handleOtpSubmit}>
                                    Verify Otp
                                </button>
                            </div>
                        }

                    </div>
                </div>
                <button className='p-2 rounded-full bg-white bg-opacity-70' onClick={handleCloseModal}><IoMdClose className="text-xl" /></button>
            </div>

        </>


    )
}

export default ForgotPassword
