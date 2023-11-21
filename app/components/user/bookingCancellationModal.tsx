'use client'
import React from 'react'

interface modalProps{
    modal:boolean,
    closeModal : ()=>void,
    cancelReason : string,
    setCancelReason : (e)=>void,
    handleConfirm:()=>void
}
const BookingCancellationModal = ({modal,closeModal,cancelReason,setCancelReason,handleConfirm}:modalProps) => {
    return (
        <>
            
            <div
                id="popup-modal"
                tabIndex={-1}
                className={`${modal ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed bg-gray-900 bg-opacity-40 top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0  max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-md shadow ">
                        
                        <div className="p-4 md:p-5 text-center">
                            <svg
                                className="mx-auto mb-4 text-gray-400 w-12 h-12 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <h3 className="mb-1 text-base font-normal text-gray-500 ">
                                Are you sure you want to cancel this booking?
                            </h3>
                            <textarea className='resize-none focus:outline-none border rounded-sm border-gray-400 w-full text-sm p-2' 
                            placeholder='Specify the reason' name="reason" id="reason" value={cancelReason} onChange={(e)=>setCancelReason(e.target.value)}></textarea>
                            <div className='mt-3'>
                                <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    onClick={handleConfirm}
                                    className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                                >
                                    Yes, I'm sure
                                </button>
                                <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    onClick={closeModal}
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default BookingCancellationModal
