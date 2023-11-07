'use client'
import React, { useEffect, useState } from 'react';
import logo from '../../../public/dineVoyageLogo.png'
import Image from 'next/image';
import Link from 'next/link';
import {BiUser} from 'react-icons/bi'
import { logout } from '@/apis/user';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setUserLogout } from '@/redux/slices/authSlice';

const Navbar = () => {

    const [dropDown, setDropDown] = useState(false)
    const [user,setUser] = useState<boolean | null>(false)

    const dispatch = useDispatch()
    const router = useRouter()

    const showMenu = () => {
        setDropDown(!dropDown)
    }

    useEffect(()=>{
        const userInfo = localStorage.getItem('userInfo');
        console.log(userInfo)
        if(userInfo){
            setUser(true)
        }
    },[])

    const userLogout = ()=>{
        const fetchData = async() =>{
            const res = await logout()
            if(res?.data.success){
                dispatch(setUserLogout())
                router.replace('/login')
            }
        }
        fetchData()
    }





    return (
        <div className="bg-white shadow fixed right-0 left-0 top-0 z-10">
            <div className="px-2 md:px-8">
                <div className="flex items-center justify-between py-2 px-4">
                    <div>
                        <Image priority={false} src={logo} alt='' width={100} />
                    </div>

                    <div className="hidden md:flex md:items-center">
                        <Link href="/" className="text-gray-800 text-lg font-semibold  px-4">Home</Link>
                        <Link href="/restaurants" className="text-gray-800 text-lg font-semibold  px-4">Book a Table</Link>
                        <div className='flex items-center'>
                            <a href="#" className="text-gray-800 text-lg font-semibold  pl-4 pr-1">Search</a>
                            <svg className="_1GTCc" viewBox="5 -1 12 25" height="17" width="17" fill="#686b78"><path d="M17.6671481,17.1391632 L22.7253317,22.1973467 L20.9226784,24 L15.7041226,18.7814442 C14.1158488,19.8024478 12.225761,20.3946935 10.1973467,20.3946935 C4.56550765,20.3946935 0,15.8291858 0,10.1973467 C0,4.56550765 4.56550765,0 10.1973467,0 C15.8291858,0 20.3946935,4.56550765 20.3946935,10.1973467 C20.3946935,12.8789625 19.3595949,15.3188181 17.6671481,17.1391632 Z M10.1973467,17.8453568 C14.4212261,17.8453568 17.8453568,14.4212261 17.8453568,10.1973467 C17.8453568,5.97346742 14.4212261,2.54933669 10.1973467,2.54933669 C5.97346742,2.54933669 2.54933669,5.97346742 2.54933669,10.1973467 C2.54933669,14.4212261 5.97346742,17.8453568 10.1973467,17.8453568 Z"></path></svg>
                        </div>
                        <div className='px-16'>
                            <div className='border border-gray-400 rounded-md'>
                                <p className='pr-32 pl-2 py-1'>Location</p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex md:items-center">
                        {user ? 
                            (<button onClick={userLogout} className='bg-red-600 px-4 py-2 text-white font-bold rounded-lg'>LogOut</button>)
                        :
                            (<Link href="/signup" className="text-md text-white font-bold border px-4 py-2 rounded-lg mr-2" style={{ backgroundColor: '#247F9E' }} >SignUp</Link>)
                        }
                    </div>

                    <div className="md:hidden flex cursor-pointer items-center">
                        {user ? 
                            (<button className='bg-red-600 px-4 py-2 text-white font-bold rounded-lg'>LogOut</button>)
                        :
                            (<Link href="/signup" className="text-md text-white font-bold border px-4 py-2 rounded-lg mr-2" style={{ backgroundColor: '#247F9E' }} >SignUp</Link>)
                        }
                        <div>
                            <img width="25" height="25" onClick={showMenu} src="https://img.icons8.com/ios-filled/50/menu--v1.png" alt="menu--v1" />
                        </div>
                    </div>
                </div>

                {dropDown &&

                    <div className="block md:hidden bg-white border-t-2 py-2 transition-opacity ease-in-out duration-500">
                        <div className="flex flex-col">
                            <a href="#" className="text-gray-800 text-lg font-semibold  px-4 py-2">Home</a>
                            <a href="#" className="text-gray-800 text-lg font-semibold  px-4 py-2">Book a Table</a>
                            <div className='flex items-center py-2'>
                                <a href="#" className="text-gray-800 text-lg font-semibold  pl-4 pr-1">Search</a>
                                <svg className="_1GTCc" viewBox="5 -1 12 25" height="17" width="17" fill="#686b78"><path d="M17.6671481,17.1391632 L22.7253317,22.1973467 L20.9226784,24 L15.7041226,18.7814442 C14.1158488,19.8024478 12.225761,20.3946935 10.1973467,20.3946935 C4.56550765,20.3946935 0,15.8291858 0,10.1973467 C0,4.56550765 4.56550765,0 10.1973467,0 C15.8291858,0 20.3946935,4.56550765 20.3946935,10.1973467 C20.3946935,12.8789625 19.3595949,15.3188181 17.6671481,17.1391632 Z M10.1973467,17.8453568 C14.4212261,17.8453568 17.8453568,14.4212261 17.8453568,10.1973467 C17.8453568,5.97346742 14.4212261,2.54933669 10.1973467,2.54933669 C5.97346742,2.54933669 2.54933669,5.97346742 2.54933669,10.1973467 C2.54933669,14.4212261 5.97346742,17.8453568 10.1973467,17.8453568 Z"></path></svg>
                            </div>
                        </div>
                    </div>

                }
            </div>
        </div>
    );
};

export default Navbar;
