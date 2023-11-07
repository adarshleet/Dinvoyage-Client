import React from 'react'
import Sidebar from '@/app/components/admin/sidebar'
import RequestTable from '@/app/components/admin/requestTable'

const page = () => {
    return (
        <div>
            <div className='flex flex-col pt-16 md:ml-72'>
                <div className=''>
                    <Sidebar page={'request'}/>
                </div>
                <div className='px-6'>
                    <RequestTable/>
                </div>
            </div>
        </div>
    )
}

export default page
