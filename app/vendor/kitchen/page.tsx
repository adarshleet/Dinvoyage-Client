import React from 'react'
import { Toaster } from 'react-hot-toast'
import Sidebar from '@/app/components/vendor/sidebar'
import CategoryTable from '@/app/components/vendor/categoryTable'
import KitchenTable from '@/app/components/vendor/kitchenTable'

const page = () => {
  return (
    <>
        <div><Toaster position='top-right'/></div>
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'kitchen'} />
            </div>
            <div className='pl-4 pr-10'>
                <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                    <h1 className='font-bold text-white'>KITCHEN ITEMS</h1>
                </div>
                <KitchenTable/>
            </div>
        </div>
        </>
  )
}

export default page
