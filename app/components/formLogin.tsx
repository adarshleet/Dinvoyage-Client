'use client'
import React,{useState} from 'react'
import Password from '../components/user/password'
import { login } from '@/apis/user'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface formLogin{
    user:boolean
}

function FormLogin({user}) {

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


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            if (formData.mobile.length != 10) {
                setError('Enter a valid mobile')
            }
            else if (formData.password.length < 8) {
                setError('Enter valid credentials')
            }
            else {
               if(user){
                    const res = await login(formData)
                    if (res?.data.data.success) {
                        toast('login successfull')
                        router.push('/')
                        console.log('login successfull')
                    }
                    else {
                        setError(res?.data.data.message)
                    }
               }
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <form className="space-y-3" onSubmit={handleLogin}>
                {error != '' &&
                    <div className="p-4 mb-4 text-xs text-red-800 rounded-md bg-red-50" role="alert">
                        <p>{error}</p>
                    </div>}
                <div>
                    <input type="number" value={formData.mobile} onChange={handleInputChange} name="mobile" id="mobile" className=" border  text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="Mobile" />
                </div>
                <Password value={formData.password} onChange={handlePasswordChange} />
                <button type="submit" className="bg-cyan-600 w-full font-bold text-white focus:outline-none text-sm px-5 py-2.5 text-center">LOGIN</button>
            </form>
        </>
    )
}

export default FormLogin
