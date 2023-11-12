import React from 'react'
import { Toaster } from 'react-hot-toast'
import Sidebar from '@/app/components/vendor/sidebar'
import CategoryTable from '@/app/components/vendor/categoryTable'

const page = () => {
  return (
    <>
        <div><Toaster position='top-right'/></div>
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'categories'} />
            </div>
            <div className='pl-4 pr-10'>
                <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                    <h1 className='font-bold text-white'>CATEGORIES</h1>
                </div>
                <CategoryTable/>
            </div>
        </div>
        </>
  )
}

export default page
