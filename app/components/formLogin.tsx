'use client'
import React, { useState, useEffect } from 'react'
import Password from '../components/user/password'
import { forgotPasswordUser, login } from '@/apis/user'
import { forgotPassword, vendorLogin } from '@/apis/vendor'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserLogin, setVendorLogin } from '@/redux/slices/authSlice'
import Link from 'next/link'
import ForgotPassword from './user/forgotPassword'
import { toast } from 'sonner'


interface formLogin {
    user: boolean
}

function FormLogin({ user }: formLogin) {

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            const userInfo = localStorage.getItem('userInfo')
            if (userInfo) {
                router.replace('/')
            }
        }
        else if (!user) {
            const vendorInfo = typeof window !== 'undefined' ? localStorage.getItem('vendorInfo') : null
            if (vendorInfo) {
                router.replace('/vendor/dashboard')
            }
        }
    }, [router,user]);


    const [formData, setFormData] = useState({
        mobile: '',
        password: '',
    });


    const [forgotModal,setForgotModal] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChange = (value: string) => {
        setFormData({ ...formData, password: value });
    };


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            if (formData.mobile.length != 10) {
                toast.error('Enter valid mobile')
            }
            else if (formData.password.length < 8) {
                toast.error('Enter valid credentials')
            }
            else {
                if (user) {
                    const res = await login(formData)
                    console.log('nbewe', res?.data.data)
                    const userId = res?.data.data.userId
                    if (res?.data.data.success) {
                        dispatch(setUserLogin(userId))
                        toast.success('login successfull')
                        router.replace('/');
                    }
                    else {
                        toast.error(res?.data.data.message)
                    }
                }
                else if (!user) {
                    const res = await vendorLogin(formData)
                    if (res?.data.data.success) {
                        dispatch(setVendorLogin('vendorLoggedIn'))
                        router.replace('/vendor/dashboard')
                    }
                    else {
                        toast.error(res?.data.data.message);
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const forgotPasswordHandle = async()=>{
        if(formData.mobile.toString().length !== 10){
            return toast.error('Enter the mobile numer')
        }

        //user password change
        if(user){
            const res = await forgotPasswordUser(formData.mobile)
            const userFound = res?.data.data
            if(userFound){
                setForgotModal(true)
            }
            else{
                toast.error('Mobile number not registered')
            }
        }
        else{
            const res = await forgotPassword(formData.mobile)
            const vendorFound = res?.data.data
            if(vendorFound){
                setForgotModal(true)
            }
            else{
                toast.error('Mobile number not registered')
            }
        }
    }

    const closeModal = ()=>{
        setForgotModal(false)
    }


    return (
        <>
            <form className="space-y-3" onSubmit={handleLogin}>
                
                <div>
                    <input type="number" value={formData.mobile} onChange={handleInputChange} name="mobile" id="mobile" className=" border  text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="Mobile" />
                </div>
                <Password value={formData.password} onChange={handlePasswordChange} />
                <button type="submit" className="bg-cyan-600 w-full font-bold text-white focus:outline-none text-sm px-5 py-2.5 text-center">LOGIN</button>
                <div className='text-sm space-y-0 flex justify-end'>
                    <p className='text-orange-600 cursor-pointer' onClick={forgotPasswordHandle}>Forgot Password ? </p>
                </div>
            </form>
            <ForgotPassword forgotModal={forgotModal} closeModal={closeModal} user={user}/>
        </>
    )
}

export default FormLogin
