'use client'
import React, { useState } from 'react'
import Navbar from '../components/user/navbar'
import Link from 'next/link'
import logo from '../../public/dineVoyageLogo.png'
import Image from 'next/image'
import Password from '../components/user/password'
import Form from '../components/form'
import Otp from '../components/user/otp'
import { signup } from '@/apis/user'
import GoogleAuth from '../components/user/googleLogin'



const page = () => {
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
                                        <Image src={logo} alt="" width={90} />
                                    </div>
                                </div>
                                <Form user={true}/>
                                <GoogleAuth/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default page