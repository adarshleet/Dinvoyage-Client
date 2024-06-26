'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/dineVoyageLogo.png'
import FormLogin from '../components/formLogin'
import GoogleAuthLogIn from '../components/vendor/googleAuthLogIn'

const page = () => {
    return (
        <>
        <main className=''>
            <div className='flex justify-center items-center'>
                <div className="flex flex-col w-full items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                    <div className="bg-white rounded-lg shadow flex flex-col md:flex-row items-center md:mt-0 py-8">
                        <div className='p-6 flex flex-col items-center w-96'>
                            <div>
                                <Image src={logo} width={200} alt='' />
                            </div>
                            <div className='flex flex-col items-center text-center'>
                                <h1 className='font-bold'>Hello Vendor</h1>
                                <p className='text-sm font-semibold'>
                                    For our valued hotel vendors,
                                    please log in to access your account and manage your listings.
                                    We appreciate your ongoing partnership.
                                </p>
                            </div>
                        </div>
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-96">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2x">
                                        Login
                                    </h1>
                                    <div className='flex gap-1 text-sm'>
                                        <p>or</p>
                                        <Link href="/vendor/register" className='text-orange-600'>new registration ?</Link>
                                    </div>
                                </div>
                            </div>
                            <FormLogin user={false}/>
                            <GoogleAuthLogIn/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default page
