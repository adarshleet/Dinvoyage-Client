'use client'
import React,{useState} from 'react'
import Navbar from '../components/user/navbar'
import Link from 'next/link'
import logo from '../../public/dineVoyageLogo.png'
import Image from 'next/image'
import Password from '../components/user/password'
import { login } from '@/apis/user'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';


const page = () => {

    const router = useRouter()

    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        mobile: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChange = (value: string) => {
        setFormData({ ...formData, password: value });
    };


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>)=>{
        try {
            e.preventDefault()
            if(formData.mobile.length != 10){
                setError('Enter a valid mobile')
            }
            else if(formData.password.length < 8){
                setError('Enter valid credentials')
            }
            else{
                const res = await login(formData)
                if(res?.data.data.success){
                    toast('login successfull')
                    router.push('/')
                    console.log('login successfull')
                }
                else{
                    setError(res?.data.data.message)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                                <form className="space-y-3" onSubmit={handleLogin}>
                                    {error != '' &&
                                        <div className="p-4 mb-4 text-xs text-red-800 rounded-md bg-red-50" role="alert">
                                            <p>{error}</p>
                                        </div>}
                                    <div>
                                        <input type="number" value={formData.mobile} onChange={handleInputChange}   name="mobile" id="mobile" className=" border  text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="Mobile"/>
                                    </div>
                                    <Password value={formData.password} onChange={handlePasswordChange}/>
                                    <button type="submit" className="bg-cyan-600 w-full font-bold text-white focus:outline-none text-sm px-5 py-2.5 text-center">LOGIN</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default page