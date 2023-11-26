'use client'
import React,{useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Password from '../components/user/password'
import logo from '../../public/dineVoyageLogo.png'
import { login } from '@/apis/admin'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux'
import { setAdminLogin } from '@/redux/slices/authSlice'


const page = () => {
    const router = useRouter()
    const dispatch = useDispatch()


    useEffect(()=>{
    const adminInfo = localStorage.getItem('adminInfo')
    console.log(adminInfo)
    if(adminInfo){
        router.push('/admin/dashboard')
    }
    },[])

    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChange = (value: string) => {
        setFormData({ ...formData, password: value });
    };

    //email validation
    function validateEmail(email:string) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        try {
            e.preventDefault()
            
            if(!validateEmail(formData.email) || formData.password.length < 5){
                setError('Enter valid admin credentials')
            }
            else{
                const res = await login(formData)
                console.log(res?.data.data)
                if(!res?.data.data.success){
                    setError(res?.data.data.message)
                }else{
                    dispatch(setAdminLogin('adminLogin'))
                    router.replace('/admin/dashboard')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className="flex flex-col w-96 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="flex flex-col items-center justify-center">
                                <div>
                                    <Image priority={false} src={logo} alt="" width={200} />
                                </div>
                                <h1 className='font-bold text-xl'>ADMIN LOGIN</h1>
                            </div>
                            <form className="space-y-3" onSubmit={handleSubmit}>
                                {error != '' &&
                                    <div className="p-4 mb-4 text-xs text-red-800 rounded-md bg-red-50" role="alert">
                                        <p>{error}</p>
                                    </div>}
                                <div>
                                    <input type="text" value={formData.email} onChange={handleInputChange} name="email" id="email" className=" border  text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="Email" />
                                </div>
                                <Password value={formData.password} onChange={handlePasswordChange} />
                                <button type="submit" className="bg-cyan-600 w-full font-bold text-white focus:outline-none text-sm px-5 py-2.5 text-center">LOGIN</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
