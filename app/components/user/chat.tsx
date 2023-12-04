import React from 'react'
import '../../chatWithVendor/chatCss.css'
import { IoIosSend } from "react-icons/io";

const Chat = () => {

    return (
        <div className='px-3 py-3 ml-3 border w-full'>
            <div className='flex items-center gap-3 p-2 bg-gray-300'>
                <div className='w-12 h-12 overflow-hidden rounded-full'>
                    <img className='w-full h-full object-cover' src="https://images7.alphacoders.com/133/1337829.png" alt="" />
                </div>
                <div>
                    <h1 className='font-semibold -mb-0.5'>Paragon Restaurant</h1>
                    <h3 className='text-xs'>Near CH Bridge, Kozhikode</h3>
                </div>
            </div>
            <div className='py-3 flex flex-col h-3/4 overflow-y-scroll'>    
                <div className='py-1 px-2 my-1 ml-4 w-fit rounded-md relative text-white vendor'>
                    <span/>
                    <div className='flex items-end gap-2'>
                        <p>Hiiiiiii bro</p>
                        <p className='text-xs'>1:12pm</p>
                    </div>
                </div>
                <div className='py-1 px-2 my-1 ml-4 w-fit rounded-md relative text-white own'>
                    <span/>
                    <div className='flex items-end gap-2'>
                        <p>Hiiiiiii bro</p>
                        <p className='text-xs'>1:12pm</p>
                    </div>
                </div>
                <div className='py-1 px-2 my-1 ml-4 w-fit rounded-md relative text-white vendor'>
                    <span/>
                    <div className='flex items-end gap-2'>
                        <p>Hiiiiiii bro</p>
                        <p className='text-xs'>1:12pm</p>
                    </div>
                </div>
                <div className='py-1 px-2 my-1 ml-4 w-fit rounded-md relative text-white own'>
                    <span/>
                    <div className=''>
                        <p>Hiiiiiii bro</p>
                        <p className='text-xs'>1:12pm</p>
                    </div>
                </div>
                <div className='py-1 px-2 my-1 ml-4 w-fit rounded-md relative text-white vendor'>
                    <span/>
                    <div className='flex items-end gap-2'>
                        <p>Hiiiiiii bro</p>
                        <p className='text-xs'>1:12pm</p>
                    </div>
                </div>
                <div className='py-1 px-2 my-1 ml-4 w-fit rounded-md relative text-white own'>
                    <span/>
                    <div className='flex items-end gap-2'>
                        <p>Hiiiiiii bro</p>
                        <p className='text-xs'>1:12pm</p>
                    </div>
                </div>
                <div className='py-1 px-2 my-1 ml-4 w-fit rounded-md relative text-white vendor'>
                    <span/>
                    <div className='flex items-end gap-2'>
                        <p>Hiiiiiii bro</p>
                        <p className='text-xs'>1:12pm</p>
                    </div>
                </div>
                <div className='py-1 px-2 my-1 ml-4 w-fit rounded-md relative text-white own'>
                    <span/>
                    <div className='flex items-end gap-2'>
                        <p>Hiiiiiii bro</p>
                        <p className='text-xs'>1:12pm</p>
                    </div>
                </div>
                <div className='py-1 px-2 my-1 ml-4 w-fit rounded-md relative text-white vendor'>
                    <span/>
                    <div className='flex items-end gap-2'>
                        <p>Hiiiiiii bro</p>
                        <p className='text-xs'>1:12pm</p>
                    </div>
                </div>
                <div className='py-1 px-2 my-1 ml-4 w-fit rounded-md relative text-white own'>
                    <span/>
                    <div className='flex items-end gap-2'>
                        <p>Hiiiiiii bro</p>
                        <p className='text-xs'>1:12pm</p>
                    </div>
                </div>
                
            </div>
            <div className='w-full flex mt-1'>
                <input type="text" className='outline-none border border-gray-500 py-2 px-3 w-full rounded-sm'/>
                <button className='flex text-white font-bold items-center p-2 bg-gray-500 rounded-sm'>Send <IoIosSend className="text-lg"/></button>
            </div>
        </div>
    )
}

export default Chat
