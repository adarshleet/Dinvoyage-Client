'use client'
import { findUser } from '@/apis/user'
import React, { useEffect, useState } from 'react'


interface walletProps{
    walletModal : boolean
    closeWalletModal : ()=>void
    applyWallet : (wallet:number) => void
}


const Wallet = ({walletModal,closeWalletModal,applyWallet}:walletProps) => {

    const [walletAmount,setWalletAmount] = useState(0)

    useEffect(()=>{
        try {
            const fetchData = async()=>{
                const res = await findUser()
                const wallet = res?.data.data
                setWalletAmount(wallet.wallet)
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    },[])

    return (
        <>
            
            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`${walletModal ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0  max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-sm shadow ">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Wallet
                            </h3>
                            <button
                                type="button"
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                                data-modal-hide="authentication-modal"
                                onClick={closeWalletModal}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5">
                            <h4 className='text-xl text-center font-bold py-2'>Wallet Amount</h4>
                            <h2 className='text-3xl text-center font-bold'>₹{walletAmount}</h2>
                            <button className='w-full my-4 py-2 font-bold bg-slate-700 text-white' onClick={()=>applyWallet(walletAmount)}>APPLY WALLET</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Wallet
