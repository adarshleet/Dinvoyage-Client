import React from 'react'
import { GoogleLogin, googleLogout,CredentialResponse } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { signup } from '@/apis/user';
import toast from 'react-hot-toast';

const GoogleAuth = () => {

    const router = useRouter()

    const gSignup = async (res: CredentialResponse) => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = jwtDecode(res.credential as string);
        // console.log(result)
        const data = {
            name: result.name,
            email: result.email,
            password: '@@google**01',
            isGoogle: true,
        };
        console.log(data)
        const response = await signup(data);
        console.log(response)
        if (response?.data.data) {
            toast.success('Signup successfull.Please Login');
            router.push('/login');
        }
        else{
            toast.error(response?.data.message)
        }
    };

    return (
        <div className='flex justify-center'>
            <GoogleLogin onSuccess={credentialResponse => { gSignup(credentialResponse); }} onError={() => { console.log('Login Failed'); }}/>
        </div>
    )
}

export default GoogleAuth
