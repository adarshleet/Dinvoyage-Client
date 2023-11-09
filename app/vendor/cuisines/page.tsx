import React from 'react'
import Sidebar from '@/app/components/vendor/sidebar'

const page = () => {
  return (
    <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'cuisines'} />
            </div>
            <div className='px-6'>
                
            </div>
        </div>
  )
}

export default page
