'use client'
import React,{useState} from 'react'
import Navbar from '../components/user/navbar'
import Link from 'next/link'
import logo from '../../public/dineVoyageLogo.png'
import Image from 'next/image'
import FormLogin from '../components/formLogin'
import GoogleAuthLogin from '../components/user/googleAuthLogin'
import { Toaster } from 'react-hot-toast'


const page = () => {

    return (
        <>
            <div><Toaster/></div>
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
                                            Login
                                        </h1>
                                        <div className='flex gap-1 text-sm'>
                                            <p>or</p>
                                            <Link href="/signup" className='text-orange-600'>create an account</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <Image priority={false} src={logo} alt="" width={90}/>
                                    </div>
                                </div>
                                <FormLogin user={true}/>
                                <GoogleAuthLogin/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default page