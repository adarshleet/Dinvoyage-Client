'use client'
import React, { useState } from 'react'
import { signup } from '@/apis/user'
import Password from '../components/user/password'
import Otp from '../components/user/otp'
import { register } from '@/apis/vendor'


interface formProps {
    user: boolean
}

const Form = ({ user }) => {
    const [otpPage, setOtpPage] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChange = (value: string) => {
        setFormData({ ...formData, password: value });
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            if (formData.name.length < 3) {
                setError('Enter your fullname')
            }
            else if (formData.mobile.length !== 10) {
                setError('Enter a valid mobile number')
            }
            else if (formData.password.length < 8) {
                setError('Password must contain 8 characters')
            }
            else if (formData.password !== formData.confirmPassword) {
                setError(`Passwords don't match`)
            }
            else {
                if (user) {
                    const res = await signup(formData)
                    console.log(res)
                    if (res?.data.data) {
                        setOtpPage(true)
                    }
                    else if (!res?.data.data) {
                        setError(res?.data.message)
                    }
                }
                else if(!user){
                    const res = await register(formData)
                    if(res?.data.data){
                        setOtpPage(true)
                    }
                    else if(!res?.data.data){
                        setError(res?.data.message)
                    }
                }

            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleCloseModel = () => {
        setOtpPage(false);
    };

    return (
        <>
            <form className="space-y-3" onSubmit={handleSignup}>
                {error != '' &&
                    <div className="p-4 mb-4 text-xs text-red-800 rounded-md bg-red-50" role="alert">
                        <p>{error}</p>
                    </div>}
                <div>
                    <input type="text" value={formData.name} onChange={handleInputChange} name="name" id="name" className=" border  text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="Name" />
                </div>
                <div>
                    <input type="number" value={formData.mobile} onChange={handleInputChange} name="mobile" id="mobile" className=" border  text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="Mobile" />
                </div>
                <Password value={formData.password} onChange={handlePasswordChange} />
                <div>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="border mb-4  text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="Confirm Password" />
                </div>
                <button className="bg-cyan-600 w-full font-bold text-white focus:outline-none text-sm px-5 py-2.5 text-center">{user ? 'SIGNUP' : 'REGISTER'}</button>
            </form>
            <Otp otpPage={otpPage} user={user} onCloseModel={handleCloseModel} />
        </>
    )
}

export default Form
