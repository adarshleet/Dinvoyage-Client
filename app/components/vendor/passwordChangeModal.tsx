'use client'
import { changePassword } from '@/apis/vendor'
import React, { useState } from 'react'


interface passwordProps{
    toaster : (message:string)=>void
    setPasswordModal : (change)=>void
}

const PasswordChangeModal = ({toaster,setPasswordModal}:passwordProps) => {

    const [passwords,setPasswords] = useState({
        currentPassword : '',
        newPassword : '',
        confirmNewPassword : ''
    })

    const handleChangePassword = async()=>{
        try {
            if(passwords.currentPassword.trim().length < 8){
                return toaster('Current password incorrect')
            }
            else if(passwords.newPassword.trim().length < 8){
                return toaster('Password must contain 8 letters')
            }
            else if(passwords.newPassword.trim() != passwords.confirmNewPassword.trim()){
                return toaster('New Passwords does not match')
            }

            const res = await changePassword(passwords)
            console.log(res?.data.data)
            if(res?.data.data){
                setPasswords({
                    currentPassword : '',
                    newPassword : '',
                    confirmNewPassword : ''
                })
                setPasswordModal(false)
                toaster('Password Changed Succesfully')
            }
            else{
                return toaster('Current Password incorrect')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center mb-6'>
            <div className='bg-white p-5 w-full lg:w-1/3 bg-opacity-70'>
                <h3 className='text-lg text-center font-bold mb-3'>Change Password</h3>
                <div>
                    <input type="password" value={passwords.currentPassword} onChange={(e)=>setPasswords({...passwords,currentPassword : e.target.value})}  className='pt-4 pb-1 px-2 my-2 w-full bg-opacity-0 bg-transparent outline-none border-b-2 border-b-gray-500 text-gray-600' placeholder='Enter Your Password'/>
                </div>
                <div>
                    <input type="password" value={passwords.newPassword} onChange={(e)=>setPasswords({...passwords,newPassword : e.target.value})}  className='pt-4 pb-1 px-2 my-2 w-full bg-opacity-0 bg-transparent outline-none border-b-2 border-b-gray-500 text-gray-600' placeholder='Enter New Password'/>
                </div>
                <div>
                    <input type="password" value={passwords.confirmNewPassword} onChange={(e)=>setPasswords({...passwords,confirmNewPassword : e.target.value})}  className='pt-4 pb-1 px-2 my-2 w-full bg-opacity-0 bg-transparent outline-none border-b-2 border-b-gray-500 text-gray-600' placeholder='Confirm new password'/>
                </div>

                <button className='w-full py-2 px-1 bg-gray-800 mt-5 text-white font-bold' onClick={handleChangePassword}>Confirm Change Password</button>
            </div>
        </div>
    )
}

export default PasswordChangeModal
