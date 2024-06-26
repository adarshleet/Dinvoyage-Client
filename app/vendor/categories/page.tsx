import React from 'react'
import Sidebar from '@/app/components/vendor/sidebar'
import CategoryTable from '@/app/components/vendor/categoryTable'

const page = () => {
  return (
    <>
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'categories'} />
            </div>
            <div className='pl-4 pr-10'>
                
                <CategoryTable/>
            </div>
        </div>
    </>
  )
}

export default page
