'use client'
import React, { useEffect, useRef, useState } from 'react'
import '../../chatWithVendor/chatCss.css'
import { IoIosSend } from "react-icons/io";
import { getConversation, getConversations, getMessages, newMessage, singleRestaurant } from '@/apis/user';
import { format, render, cancel, register } from 'timeago.js';
import {io,Socket} from "socket.io-client"



interface chatProps{
    conversationId:string
}

interface Message{
    text:string,
    createdAt:string,
    sender:string,
    conversationId:string
}

interface Restaurant{
    restaurantName:string,
    landmark:string,
    banners: string,
    locality :string
}

// interface ArrivalMessage{
//     sender :string,
//     text:string,
//     createdAt : Date
// }

const Chat = ({conversationId}:chatProps) => {

    const [messages,setMessages] = useState<Array<Message>>([])
    const [user,setUser] = useState('')
    const [message,setMessage] = useState('')
    const [restaurant,setRestaurant] = useState<Restaurant | null>(null)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const [arrivalMessage,setArrivalMessage] = useState(null)


    const socket = useRef<Socket | undefined>();


    useEffect(()=>{
        socket.current = io("ws://localhost:5000")
        socket.current.on('getMessage',data=>{
            setArrivalMessage({
                sender : data.senderId,
                text : data.text,
                createdAt : Date.now()
            })
        })
    },[])

    useEffect(()=>{
        arrivalMessage &&
            setMessages(prev=>[...prev,arrivalMessage])
    },[arrivalMessage])
    
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('userInfo') as string)
        socket.current?.emit('addUser',user)
    },[])
    

    useEffect(()=>{
        try {
            const fetchData = async()=>{

                const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)

                // socket adding. adding user
                socket.current?.emit('addUser',userInfo)


                //getting restaurant details for showing the name
                const response = await getConversation(conversationId)
                const data = response?.data.data
                const restaurantId = data.members.find((m:string)=>m!==userInfo)
                const restaurant = await singleRestaurant(restaurantId) 
                setRestaurant(restaurant?.data.data)

                //getting chats
                const res = await getMessages(conversationId)
                setUser(userInfo)
                const messages = res?.data.data
                setMessages(messages)
                
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    },[])

    

    const messageSendHandle = async(e)=>{
        try {
            e.preventDefault()
            const res = await newMessage(message,conversationId,user)


            socket.current?.emit("sendMessage",{
                senderId:user,
                recieverId : restaurant?._id,
                text : message
            })


            if(res?.data.data){
                console.log(res.data.data)
                setMessages([...messages,res.data.data])
                setMessage('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    },[messages])


    return (
        <div className='px-3 py-3 ml-3 border w-full'>
            <div className='flex items-center gap-3 p-2 bg-gray-300'>
                <div className='w-12 h-12 overflow-hidden rounded-full'>
                    <img className='w-full h-full object-cover' src={restaurant?.banners} alt="" />
                </div>
                <div>
                    <h1 className='font-semibold -mb-0.5'>{restaurant?.restaurantName}</h1>
                    <h3 className='text-xs'>{restaurant?.landmark}, {restaurant?.locality}</h3>
                </div>
            </div>
            <div className='py-3 flex flex-col h-96 overflow-y-scroll'>    
                {messages.map((message:Message,index:number)=>(
                    <div className={`py-1 px-2 my-1 ml-4 w-fit rounded-md relative text-white ${user == message.sender ? 'own' : 'vendor'}`} key={index} ref={index === messages.length - 1 ? scrollRef : null}>
                        <span/>
                        <div className='items-end gap-2'>
                            <p className='-mb-1 text-sm max-w-sm'>{message.text}</p>
                            <p className='' style={{fontSize:'.65rem'}}>{format(message.createdAt)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form className='w-full flex mt-1' onSubmit={messageSendHandle}>
                <input type="text" className='outline-none border border-gray-500 py-2 px-3 w-full rounded-sm' value={message} onChange={(e)=>setMessage(e.target.value)}/>
                {(message.trim().length != 0 && message[0]!=' ') &&<button className='flex text-white font-bold items-center p-2 bg-gray-500 rounded-sm' type='submit'>Send <IoIosSend className="text-lg"/></button>}
            </form>
        </div>
    )
}

export default Chat
