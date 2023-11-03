import React from 'react'
import Sidebar from '@/app/components/admin/sidebar'
import FacilitiesTable from '@/app/components/admin/facilitiesTable'
import { allFacilities } from '@/apis/admin';
import CuisineTable from '@/app/components/admin/cuisinetable';




const page = () => {
    return (
        <div className='flex flex-col pt-16 md:ml-72'>
            <div className=''>
                <Sidebar />
            </div>
            
            <div className='px-4'>
            <div className='w-full bg-cyan-600 p-3 rounded-md mb-4'>
                <h1 className='font-bold text-white'>CUISINES AND FACILITIES</h1>
            </div>
            <div className='flex gap-4'>
                <CuisineTable />
                <FacilitiesTable />
            </div>
            </div>

        </div>
    )
}

export default page
