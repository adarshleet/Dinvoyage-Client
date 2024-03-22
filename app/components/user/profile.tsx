'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { changeName, findUser, logout } from '@/apis/user'
import { setUserLogout } from '@/redux/slices/authSlice'
import { toast }from 'sonner'
import MobileChangeModal from './mobileChangeModal'
import PasswordChangeModal from './passwordChangeModal'


interface User{
    name ?: string
    mobile : string | number
    email ?: string
}

const Profile = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const [user,setUser] = useState<User>()
    const [input,setInput] = useState(false)
    const [userName,setUsername] = useState<string>('')

    //mboile change
    const [mobile,setMobile] = useState<number|null>(null)
    const [mobileModal,setMobileModal] = useState(false)

    //password modal
    const [passwordModal,setPasswordModal] = useState(false)

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await findUser()
            const user = res?.data.data
            setUser(user)
        }
        fetchData()
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

    const nameChange = ()=>{
        setInput(true)
        setUsername(user?.name as string)
    }

    const nameChangeSubmit = async()=>{
        const res = await changeName(userName as string)

        if(userName == user?.name || userName.trim().length < 3){
            return toast.error('Please enter the new username for saving !')
        }

        if(res?.data.data){
            // setUser({...user,name:userName as string})
            setUser((prevUser) => ({
                ...prevUser,
                name: userName as string,
                mobile: prevUser?.mobile !== undefined ? prevUser?.mobile : '',
            }));
            setInput(false)
            toast.success('Name changed successfully')
        }
    }


   


    //mobile change

    return (
        <>
        <div className='md:px-6 w-full'>
            <div className='md:border md:p-4'>
                <h4 className='font-bold text-lg mb-3'>Edit Profile</h4>
                <div className='pt-3 pb-5 border-b'>
                    <h1 className='font-bold mb-0.5'>Name</h1>
                    <div className='flex justify-between items-center'>
                        {!input ? 
                        <>
                        <h1>{user?.name}</h1> 
                        <button className='border border-orange-600 py-1 px-2 rounded-sm font-bold text-orange-600 text-sm' onClick={nameChange}>Change</button>
                        </>
                        :
                        <>
                        <input type="text" value={userName} onChange={(e)=>setUsername(e.target.value)} className='py-1 px-1 outline-none border' />
                        <button className='border border-orange-600 py-1 px-2 rounded-sm font-bold text-orange-600 text-sm' onClick={nameChangeSubmit}>Save</button>
                        </>
                        }
                    </div>
                </div>
                <div className='pt-3 pb-5 border-b'>
                    <h1 className='font-bold mb-0.5'>Mobile</h1>
                    <div className='flex justify-between items-center'>
                        <h1>{user?.mobile ? user?.mobile : '- Not added -'}</h1>
                        {user?.mobile && <button className='border border-orange-600 py-1 px-2 rounded-sm font-bold text-orange-600 text-sm' onClick={()=>setMobileModal(true)}>Change</button>}
                    </div>
                </div>
                <div className='pt-3 pb-5 border-b'>
                    <h1 className='font-bold mb-0.5'>Email</h1>
                    <div className='flex justify-between items-center'>
                        <h1>{user?.email ? user?.email : '- Not added -'}</h1>
                        {/* {user?.mobile && <button className='border border-orange-600 py-1 px-2 rounded-sm font-bold text-orange-600 text-sm'>Change</button>} */}
                    </div>
                </div>
                <div className='pt-3 pb-5 border-b'>
                    <h1 className='font-bold mb-0.5'>Password</h1>
                    <div className='flex justify-between items-center'>
                        <h1 >*************</h1>
                        {user?.mobile && <button className='border border-orange-600 py-1 px-2 rounded-sm font-bold text-orange-600 text-sm' onClick={()=>setPasswordModal(true)}>Change</button>}
                    </div>
                </div>
                <div className='pt-3'>
                    <button className='text-sm py-1 px-3 font-bold text-white bg-red-700 rounded-sm' onClick={userLogout}>LOGOUT</button>
                </div>
            </div>
        </div>
        <MobileChangeModal  setMobileModal={setMobileModal} mobileModal={mobileModal}
            currentMobile={user?.mobile !== undefined ? user?.mobile : ''}
            user={user}
            setUser={setUser}
        />
        <PasswordChangeModal passwordModal={passwordModal} setPasswordModal={setPasswordModal}/>
        </>
    )
}

export default Profile
