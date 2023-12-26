'use client'
import { selectedCuisinesAndFacilities } from '@/apis/vendor'
import React, { useEffect, useRef, useState } from 'react'
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs'
import profile from '../../../public/noProfile.webp'
import Image from 'next/image'
import '../../vendor/messages/message.css'
import { IoIosSend } from "react-icons/io";
import { getConversations, getMessages, newMessage } from '@/apis/user'
import Conversations from './conversations'
import { format, render, cancel, register } from 'timeago.js';
import { IoMdChatboxes } from "react-icons/io";
import {io,Socket} from "socket.io-client"

interface conversation{
    members: string[]
}

interface message{
    sender:string
    text : string
    createdAt : number
}

const Messages = () => {


    const [restaurant, setRestaurant] = useState<any>({})
    const [allRestaurant, setAllRestaurant] = useState<any>([])
    const [page, setPage] = useState(0)

    const [conversations, setConversations] = useState([])
    const [messages,setMessages] = useState<message[]>([])
    const [selectedChat,setSelectedChat] = useState<string | null>(null)
    const [message,setMessage] = useState('')
    const [conversationId,setConversationId] = useState('')
    const [restaurantId,setRestaurantId] = useState('')

    const [user,setUser] = useState<string | null>(null)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const socket = useRef<Socket | undefined>();
    const [arrivalMessage,setArrivalMessage] = useState<message | null>(null)
    const [conversation,setConversation] = useState<conversation>()





    useEffect(()=>{
        socket.current = io("ws://localhost:5000")
        console.log(arrivalMessage)
        socket.current.on('getMessage',data=>{
            setArrivalMessage({
                sender : data.senderId,
                text : data.text,
                createdAt : Date.now()
            })
        })
    },[arrivalMessage])


    useEffect(()=>{
        arrivalMessage && conversation?.members.includes(arrivalMessage.sender) &&
            setMessages(prev=>[...prev,arrivalMessage])
    },[arrivalMessage,conversation])


    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await selectedCuisinesAndFacilities();
                if (res?.data) {
                    const restaurantData = res.data.data;
                    setAllRestaurant(restaurantData);
                    setRestaurant(restaurantData[page])
                    if (restaurantData[page]) {
                        const res = await getConversations(restaurantData[page]._id)
                        const conversations = res?.data.data
                        setConversations(conversations)
                        setRestaurantId(restaurantData[page]._id)

                        //socket adding. adding user
                        socket.current?.emit('addUser',restaurantData[page]._id)
                    }
                }

            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [page])



    const pagePlus = async () => {
        setPage(page + 1)
        setRestaurant(allRestaurant[page + 1])
        if (allRestaurant[page + 1]) {
            const res = await getConversations(allRestaurant[page+1]._id)
            console.log(res)
            const conversations = res?.data.data
            setConversations(conversations)
            setRestaurantId(allRestaurant[page+1]._id)
            setSelectedChat(null)
            setArrivalMessage(null)

            //socket adding. adding user
            socket.current?.emit('addUser',allRestaurant[page+1]._id)
        }
    }

    const pageMinus = async () => {
        setPage(page - 1)
        setRestaurant(allRestaurant[page - 1])
        if (allRestaurant[page - 1]) {
            const res = await getConversations(allRestaurant[page-1]._id)
            const conversations = res?.data.data
            setConversations(conversations)
            setRestaurantId(allRestaurant[page-1]._id)
            setSelectedChat(null)
            setArrivalMessage(null)

              //socket adding. adding user
              socket.current?.emit('addUser',allRestaurant[page-1]._id)
        }
    }


    const selectChat = async(conversation:any,name:string,userId:string)=>{
        try {
            const res = await getMessages(conversation._id)
            const messages = res?.data.data
            setMessages(messages)
            setSelectedChat(name)
            setConversationId(conversation._id)
            setConversation(conversation)
            setUser(userId)

        } catch (error) {
            console.log(error)
        }
    }

    const handleSendMessage = async(e:React.FormEvent)=>{
        try {
            e.preventDefault()
            const res = await newMessage(message,conversationId,restaurantId)
            const messageToAdd={
                text:message,
                conversationId,
                sender:restaurantId
            }

            socket.current?.emit("sendMessage",{
                senderId:restaurantId,
                recieverId : user,
                text : message
            })

            if(res?.data.data){
                setMessages([...messages,res.data.data])
                setMessage('')
            }
            console.log(message)
            setMessage('')
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    },[messages])


    return (
        <>
            <div className='w-full bg-slate-700 pb-10 p-3 rounded-md mb-16 relative'>
                <h1 className='font-bold text-white text-center mb-2'>MESSAGES</h1>
                <div className='flex justify-between items-center p-3 border shadow-md bg-white mb-2 absolute rounded-sm left-3 right-3'>
                    <div className=''>
                        <h4 className='text-xl text-gray-800 font-bold'>{restaurant?.restaurantName}</h4>
                        <h5 className='text-md text-gray-700 font-semibold'>{restaurant?.landmark}</h5>
                    </div>
                    <div className='flex gap-4 text-xl text-gray-600 font-bold'>
                        <button onClick={pageMinus} disabled={page === 0}><BsFillArrowLeftSquareFill /></button>
                        <h5>{page + 1}/{allRestaurant.length}</h5>
                        <button onClick={pagePlus} disabled={page === allRestaurant.length - 1}><BsFillArrowRightSquareFill /></button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row w-full gap-1 justify-between shadow-sm bg-white' style={{ minHeight: '31rem' }}>
                {conversations?.length != 0 ?
                <>
                <div className='max-w-full overflow-x-scroll md:overflow-auto md:flex-auto md:w-64 bg-gray-600 p-2'>
                    {conversations?.map((conversation, index) => (
                        <Conversations key={index} conversation={conversation} restaurantId={restaurantId} selectChat={selectChat}/>
                    ))}
                </div>

                <div className='md:flex-auto md:w-full bg-white'>
                {selectedChat ?          
                <>
                    <div className='flex items-center bg-gray-600 text-white border-l p-3 gap-2 font-bold'>
                        <div className='w-10 h-10  rounded-full overflow-hidden'>
                            <Image src={profile} alt='profile' />
                        </div>
                        <p>{selectedChat}</p>
                    </div>
                    <div className='flex flex-col py-2 px-2 h-96 overflow-y-scroll'>
                        {messages?.map((message,index)=>(
                        <div className={`py-1 px-2 my-1 ml-4 w-fit rounded-md relative  ${restaurantId == message.sender ? 'own' : 'user'} text-black` } key={index} ref={index === messages.length - 1 ? scrollRef : null}>
                            <span />
                            <div className='items-end gap-2'>
                                <p className='-mb-1 max-w-sm'>{message.text}</p>
                                <p className='' style={{ fontSize: '.7rem' }}>{format(message.createdAt)}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    <form className='p-3 flex gap-1' onSubmit={handleSendMessage}>
                        <input type="text" className='py-1.5 px-4 outline-none rounded-full border w-full border-gray-400' value={message} onChange={(e)=>setMessage(e.target.value)}/>
                        {(message.trim().length != 0 && message[0]!=' ') && <button className='px-3.5 bg-gray-700 rounded-full' type='submit'><IoIosSend className="text-xl text-white" /></button>}
                    </form>
                    </>
                    :
                    <div className='text-center py-8 text-2xl font-bold text-gray-400 h-full flex flex-col items-center justify-center'>
                        <h1>Select a chat to see messages</h1>
                        <IoMdChatboxes className="text-6xl"/>
                    </div>
                    
                }
                </div>
                </>
                :
                <div className='text-center py-8 text-2xl font-bold text-gray-400 h-full w-full flex flex-col items-center justify-center'>
                        <h1>No chats to show</h1>
                        <IoMdChatboxes className="text-6xl"/>
                </div>
                
            }
            </div>
        </>
    )
}

export default Messages
