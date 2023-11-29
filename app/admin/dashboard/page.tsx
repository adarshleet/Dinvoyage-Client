import React from 'react'
import Sidebar from '@/app/components/admin/sidebar'
import AdminLogout from '@/app/components/admin/adminLogout'
import AdminDashboard from '@/app/components/admin/adminDashboard'

const page = () => {
    return (
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar page={'dashboard'} />
            </div>
            <div className='px-6'>
                <div className='border shadow bg-white p-4 flex justify-between items-center'>
                    <h3 className='font-bold text-lg'>ADMIN DASHBOARD</h3>
                    <AdminLogout/>
                </div>
                <AdminDashboard/>
            </div>
        </div>
    )
}

export default page
