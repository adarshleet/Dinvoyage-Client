import React, { useEffect } from 'react'
import { GoogleLogin, googleLogout, CredentialResponse } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { vendorLogin } from '@/apis/vendor'
import { useDispatch } from 'react-redux'
import { setVendorLogin } from '@/redux/slices/authSlice'


const GoogleAuthLogIn = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(()=>{
        const vendorInfo = typeof window !== 'undefined' ? localStorage.getItem('vendorInfo') : null
        if(vendorInfo){
            router.push('/vendor/dashboard')
        }
    })

    const gLogin = async(res:CredentialResponse)=>{
        const result: any = jwtDecode(res.credential as string);

        const data = {
            email: result.email,
            password: '@@google**01',
            isGoogle: true,
        };

        const response = await vendorLogin(data)
        // console.log(response)
        const status = response?.data.data
        console.log(status)
        if(status.success){
            dispatch(setVendorLogin('vendorLoggedIn'))
            toast.success('Log in successfull')
            router.replace('/vendor/dashboard')
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

export default GoogleAuthLogIn
