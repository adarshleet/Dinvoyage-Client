'use client'
import { changeVendorName, getVendorDetails } from '@/apis/vendor'
import React, { useEffect, useState } from 'react'
import {toast} from 'sonner'
import MobileChange from './mobileChange'
import PasswordChangeModal from './passwordChangeModal'

interface Vendor{
    name : string
    email ?:string
    mobile ?: string
}

const VendorProfile = () => {
    const [vendor,setVendor] = useState<Vendor>({ name: '', email: '', mobile: '' })
    const [vendorName,setVendorName] = useState('')
    const [vendorNameInput,setVendorNameInput] = useState(false)

    const [mobileModal,setMobileModal] = useState(false)
    const [passwordModal,setPasswordModal] = useState(false)

    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const res = await getVendorDetails()
                const vendor = res?.data.data
                setVendor(vendor)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])


    const setNameInput = ()=>{
        setVendorName(vendor.name)
        setVendorNameInput(true)
    }

    const changeNameHandle = async()=>{
        try {

            if(vendorName.trim().length < 3){
                return toast.error('Enter a valid name')
            }

            const res = await changeVendorName(vendorName)
         
            if(res?.data.data){
                setVendor({...vendor,name:vendorName})
                setVendorNameInput(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    

    return (
        <>
            <div className='w-full bg-slate-700 py-5 p-3 rounded-md mb-16 relative bg-cover bg-bottom' style={{
                backgroundImage: 'url("https://media.istockphoto.com/id/1191675284/photo/empty-real-wood-table-top-with-light-reflection-on-scene-at-restaurant-pub-or-bar-at-night.webp?b=1&s=170667a&w=0&k=20&c=8x8MXMQ1iGSE3nghO0gyGHxmVARIWeUy52EqiJ3ObEw=")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                }}>
                <div className='w-full flex justify-center items-center mb-3'>
                    <h1 className='text-white font-bold text-xl'>VENDOR PROFILE</h1>
                </div>
                {(!mobileModal && !passwordModal) &&
                    <div className='flex justify-center mb-6'>
                    <div className='bg-white p-5 w-full md:w-3/4 bg-opacity-70'>
                        <div className='pb-4 mb-4 border-b-2'>
                            <h1 className='mb-0.5 font-bold text-lg'>Name</h1>
                            <div className='flex justify-between'>
                                {!vendorNameInput ?
                                <>
                                <h1>{vendor.name}</h1>
                                <button className='py-1 px-2 bg-orange-600 text-white font-bold rounded-sm' onClick={setNameInput}>Change</button>
                                </>
                                :
                                <>
                                <input type="text" className='py-1 px-2 border-2 border-gray-200 outline-none bg-transparent' value={vendorName} onChange={(e)=>setVendorName(e.target.value)}/>
                                <button className='py-1 px-2 bg-orange-600 text-white font-bold rounded-sm' onClick={changeNameHandle}>Update</button>
                                </>
                                }
                            </div>
                        </div>
                        <div className='pb-4 mb-4 border-b-2'>
                            <h1 className='mb-0.5 font-bold text-lg'>Mobile</h1>
                            <div className='flex justify-between'>
                                <h1>{vendor.mobile ? vendor.mobile : '- Not Added -'}</h1>
                                {vendor.mobile && <button className='py-1 px-2 bg-orange-600 text-white font-bold rounded-sm ' onClick={()=>setMobileModal(true)}>Change</button>}
                            </div>
                        </div>
                        <div className='pb-4 mb-4 border-b-2'>
                            <h1 className='mb-0.5 font-bold text-lg'>Email</h1>
                            <div className='flex justify-between'>
                                <h1>{vendor.email ? vendor.email : '- Not Added -'}</h1>
                                {/* <button className='py-1 px-2 bg-orange-600 text-white font-bold rounded-sm'>Change</button> */}
                            </div>
                        </div>
                        <div className='pb-4 mb-4 border-b-2'>
                            <h1 className='mb-0.5 font-bold text-lg'>Password</h1>
                            <div className='flex justify-between'>
                                <h1>***************</h1>
                                {vendor.mobile && <button className='py-1 px-2 bg-orange-600 text-white font-bold rounded-sm' onClick={()=>setPasswordModal(true)}>Change</button>}
                            </div>
                        </div>
                    </div>
                </div>}
                {mobileModal && <MobileChange setMobileModal={setMobileModal} vendor={vendor} setVendor={setVendor}/>}
                {passwordModal && <PasswordChangeModal setPasswordModal={setPasswordModal}/>}
            </div>
        </>
    )
}

export default VendorProfile
