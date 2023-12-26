'use client'
import { findUser } from '@/apis/user'
import React, { useEffect, useState } from 'react'


interface wallet{
    transactionType: string,
    method: string,
    amount: number,
    date: Date,
}

const WalletProfile = () => {

    const [walletAmount, setWalletAmount] = useState(0)
    const [walletHistory, setWalletHistory] = useState<wallet[]>([])

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await findUser()
                const wallet = res?.data.data
                setWalletAmount(wallet?.wallet)
                setWalletHistory(wallet?.walletHistory)
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    })

    const formatDate = (date:Date)=>{
        const dateObject = new Date(date);
        const options:object = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        return formattedDate
    }

    return (
        <div className='w-full px-5'>
            <div className='text-center pl-2 py-4 border'>
                <h1 className='text-2xl font-bold mb-2'>Wallet Amount</h1>
                <h2 className='text-4xl font-bold'>₹{walletAmount}</h2>
            </div>
            <div className="relative overflow-x-auto">
            { walletHistory?.length &&
            <table className="w-full text-sm text-left rtl:text-right text-gray-600 border">
                    <thead className="text-sm text-gray-900 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Transaction Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Method
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {   walletHistory.map((wallet,index:number)=>(      
                        <tr className="bg-white border-b " key={index}>
                                <th
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    ₹{wallet.amount}
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{wallet.method}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{wallet.transactionType}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{formatDate(wallet.date)}</td>
                        </tr>
                    ))}
                    
                    </tbody>
                </table>}
            </div>

        </div>
    )
}

export default WalletProfile
