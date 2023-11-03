'use client'
import React,{useState} from 'react'
import Table from '@/app/components/admin/table'
import Sidebar from '@/app/components/admin/sidebar'

const page = () => {
    return (
        <div>
            <div className='flex flex-col pt-16 md:ml-72'>
                <div className=''>
                    <Sidebar />
                </div>
                <Table user={false}/>
            </div>
        </div>
    )
}

export default page
