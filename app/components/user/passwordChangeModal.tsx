'use client'
import { changePassword } from '@/apis/user'
import React, { useState } from 'react'

interface passwordProps {
    passwordModal: boolean
    setPasswordModal: (modal: boolean) => void
    toaster : (message:string)=>void
}

const PasswordChangeModal = ({ passwordModal, setPasswordModal ,toaster}: passwordProps) => {

    const [passwords,setPasswords] = useState({
        currentPassword : '',
        newPassword : '',
        confirmNewPassword : ''
    })


    const changePasswordHandle = async()=>{
        try {
            if(passwords.currentPassword.trim().length < 8){
                return toaster('Current Password Incorrect')
            }
            else if(passwords.newPassword.trim().length < 8){
                return toaster('Password Must Contain 8 Letters')
            }
            else if(passwords.newPassword.trim() != passwords.confirmNewPassword.trim()){
                return toaster('Password and confirm password does not match')
            }

            const res = await changePassword(passwords)
            const status = res?.data.data
            if(!status){
                return toaster('Current Password Incorrect')
            }
            else if(status){
                setPasswords({
                    confirmNewPassword : '',
                    currentPassword :'',
                    newPassword : ''
                })
                setPasswordModal(false)
                toaster('Password Changed Successfully')
            }

        } catch (error) {
            console.log(error)
        }
    }


    const closeModal = () => {
        setPasswords({
            confirmNewPassword : '',
            currentPassword :'',
            newPassword : ''
        })
        setPasswordModal(false)
    }

    return (
        <>

            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`overflow-y-auto overflow-x-hidden fixed ${passwordModal ? 'flex' : 'hidden'} top-0 right-0 left-0 bg-gray-900 bg-opacity-50 z-50 justify-center items-center w-full inset-0 max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-md shadow ">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Change Password
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
                                        type="password"
                                        name="currentPassword"
                                        id="currentPassword"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md outline-none block w-full p-2.5 "
                                        placeholder="Enter Current Password"
                                        value={passwords.currentPassword}
                                        onChange={(e) => setPasswords({...passwords,currentPassword:e.target.value})}
                                    />
                                </div>

                                <div>

                                    <input
                                        type="password"
                                        name="newPassword"
                                        id="newPassword"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md outline-none block w-full p-2.5 "
                                        placeholder="Enter new password"
                                        value={passwords.newPassword}
                                        onChange={(e) => setPasswords({...passwords,newPassword:e.target.value})}
                                    />
                                </div>

                                <div>

                                    <input
                                        type="password"
                                        name="confirmNewPassword"
                                        id="confirmNewPassword"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md outline-none block w-full p-2.5 "
                                        placeholder="Confirm new password"
                                        value={passwords.confirmNewPassword}
                                        onChange={(e) => setPasswords({...passwords,confirmNewPassword:e.target.value})}
                                    />
                                </div>


                                <button
                                    type="submit"
                                    className="w-full text-white bg-slate-700 font-bold  rounded-md text-base px-5 py-2.5 text-center"
                                    onClick={changePasswordHandle}
                                >
                                    Update Password
                                </button>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PasswordChangeModal
