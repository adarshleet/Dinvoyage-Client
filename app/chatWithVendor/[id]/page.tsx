import React from 'react'
import Navbar from '../../components/user/navbar'
import ProfileSideBAr from '../../components/user/profileSideBar'
import Bookings from '../../components/user/bookings'
import Chat from '../../components/user/chat'

interface chatProps{
    params:{
        id:string
    }
}

const page = ({params}:chatProps) => {

    const {id} = params

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='bg-white py-24 md:px-10 flex justify-center'>
                <div className='flex bg-white p-4 border-2 md:w-3/4'>
                    <ProfileSideBAr page='bookings'/>
                    {/* <Bookings/> */}
                    <Chat conversationId={id}/>
                </div>
            </main>
        </>
    )
}

export default page
