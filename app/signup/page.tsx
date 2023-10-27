'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/user/navbar'
import Link from 'next/link'
import logo from '../../public/dineVoyageLogo.png'
import Image from 'next/image'
import Password from '../components/user/password'
import Otp from '../components/user/otp'
import { signup } from '@/apis/user'


const page = () => {
    const [otpPage,setOtpPage] = useState(false)

    const handleSignup = async(e:React.FormEvent<HTMLFormElement>)=>{
        try {
            e.preventDefault()
            const res = await signup({name:'gefd',mobile:'8138948090',password:'sdgdfgfd'})
            console.log(res)
            if(res?.data.data){
                setOtpPage(!otpPage)
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
            <header>
                <Navbar />
            </header>
            <main className=''>
                <div className='flex justify-center items-center'>
                    <div className="flex flex-col w-96 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2x">
                                            Signup
                                        </h1>
                                        <div className='flex gap-1 text-sm'>
                                            <p>or</p>
                                            <Link href="/login" className='text-orange-600'>login to your account</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <Image src={logo} alt="" width={90}/>
                                    </div>
                                </div>
                                <form className="space-y-4" onSubmit={handleSignup}>
                                    <div>
                                        <input type="text"  name="name" id="name" className=" border  text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="Name" />
                                    </div>
                                    <div>
                                        <input type="number"  name="mobile" id="mobile" className=" border  text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="Mobile"/>
                                    </div>
                                    <Password/>
                                    <div>
                                        <input type="password"  name="confirmPassword" id="confirmPassword" className="border mb-4  text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="Confirm Password"/>
                                    </div>
                                    <button className="bg-cyan-600 w-full font-bold text-white focus:outline-none text-sm px-5 py-2.5 text-center">SIGNUP</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Otp otpPage={otpPage} onCloseModel={handleCloseModel}/>
            </main> 
        </>
    )
}

export default page