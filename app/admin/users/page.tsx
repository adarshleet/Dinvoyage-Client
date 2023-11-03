import React from 'react'
import Sidebar from '@/app/components/admin/sidebar'
import Table from '@/app/components/admin/table'



const page = () => {
    return (
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar />
            </div>
            <Table user={true}/>
        </div>
    )
}

export default page
