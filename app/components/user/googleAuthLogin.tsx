import React from 'react'
import { GoogleLogin, googleLogout, CredentialResponse } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { login } from '@/apis/user'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUserLogin } from '@/redux/slices/authSlice'


const GoogleAuthLogin = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const gLogin = async(res:CredentialResponse)=>{
        const result: any = jwtDecode(res.credential as string);

        const data = {
            email: result.email,
            password: '@@google**01',
            isGoogle: true,
        };

        const response = await login(data)
        // console.log(response)
        const status = response?.data.data
        console.log(status)
        if(status.success){
            dispatch(setUserLogin('userLoggedIn'))
            toast.success('Log in successfull')
            router.replace('/')
        }
        else{
            if(status.message == 'You have been blocked'){
                toast.error(status.message)
            }else{
                toast.error('Email Id not exist. Please signup')
            }
        }
    }

    return (
        <div className='flex justify-center'>
            <GoogleLogin onSuccess={credentialResponse => { gLogin(credentialResponse); }} onError={() => { console.log('Login Failed'); }} />
        </div>
    )
}

export default GoogleAuthLogin
