import React from 'react'
import Sidebar from '@/app/components/vendor/sidebar'
import CategoryTable from '@/app/components/vendor/categoryTable'
import KitchenTable from '@/app/components/vendor/kitchenTable'
import Messages from '@/app/components/vendor/messages'

const page = () => {
  return (
    <>
        <div className='flex flex-col pt-10 md:ml-72'>
            <div className=''>
                <Sidebar page={'messages'} />
            </div>
            <div className='pl-4 pr-10'>
                
                <Messages/>
            </div>
        </div>
        </>
  )
}

export default page
