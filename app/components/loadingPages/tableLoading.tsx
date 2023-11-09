import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TableSkeleton = () => {
    return (
        <tr className="bg-white border-b text-s">
            <td className='px-6 py-4 whitespace-nowrap'>
                <Skeleton count={5} className='my-6' />
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
                <Skeleton count={5} className='my-6' />
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
                <Skeleton count={5} className='my-6' />
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
                <Skeleton count={5} className='my-6' />
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
                <Skeleton count={5} className='my-6' />
            </td>
        </tr>
    )
}

export default TableSkeleton
