'use client'
import React, { useEffect, useState } from 'react'
Image
import profile from '../../../public/noProfile.webp'
import Image from 'next/image'
import { findUserById } from '@/apis/user'

interface conversationProps{
    conversation:{
        members:Array<string>,
        _id:string
    },
    restaurantId:string,
    selectChat:(conversation:object,name:string,userId:string)=>void
}

interface user{
    name:string
}

const Conversations = ({conversation,restaurantId,selectChat}:conversationProps) => {

    const [user,setUser]= useState<user | null>(null)

    useEffect(()=>{
        const fetchData = async()=>{
            const userId= conversation.members.find(m=>m!==restaurantId)
            const res = await findUserById(userId as string)
            const user = res?.data.data
            setUser(user)
        }
        fetchData()
    },[])

    return (
            <div className='flex flex-col md:flex-row -gap-2 w-fit md:w-full items-center md:gap-2 p-2 text-white cursor-pointer hover:bg-slate-500 rounded-md' onClick={()=>selectChat(conversation,user?.name,user?._id)}>
                <div className='w-10 h-10  rounded-full overflow-hidden'>
                    <Image src={profile} alt='profile' />
                </div>
                <p>{user?.name}</p>
            </div>
    )
}

export default Conversations
