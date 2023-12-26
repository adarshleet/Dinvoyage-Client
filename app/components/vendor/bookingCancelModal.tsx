import React from 'react'

interface modalProps{
    modal:boolean,
    handleModal : ()=>void,
    cancelReason : string,
    setCancelReason : (e: string)=>void,
    handleConfirmCancel : ()=>void
}

const BookingCancelModal = ({modal,handleModal,cancelReason,setCancelReason,handleConfirmCancel}:modalProps) => {

    return (
        <>
            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`${modal ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center bg-gray-900 bg-opacity-60 items-center w-full inset-0 max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow p-6">
                        {/* Modal header */}
                        <div className=" text-center rounded-t pb-3">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Are you sure you want to cancel ?
                            </h3>
                        </div>
                        {/* Modal body */}
                        <div className="">
                            <div className="space-y-4">
                                <div className='text-center'>
                                    <textarea
                                        name="reason"
                                        id="reason"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none block w-full p-2.5 resize-none"
                                        placeholder="Specify the reason for cancellation"
                                        value={cancelReason}
                                        onChange={(e)=>setCancelReason(e.target.value)}
                                    />
                                </div>

                                <div className='flex w-full justify-center'>
                                    <button
                                        className=" text-white bg-red-600 hover:bg-red-800 mx-2  font-bold rounded-md text-base px-5 py-2.5 text-center "
                                        onClick={handleConfirmCancel}
                                    >
                                        Yes, I am Sure
                                    </button>
                                    <button className='text-gray-800 mx-2 rounded-md border-gray-500 border-2 px-5 py-2.5' onClick={handleModal}>
                                        No, Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default BookingCancelModal
