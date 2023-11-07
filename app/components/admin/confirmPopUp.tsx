'use client'
import React from 'react'

interface PopUpProps{
    confirmPopUp:boolean,
    changeStatus : (id: string) => Promise<void>;
    id:string,
    onCloseModel : () => void
}

const ConfirmPopUp = ({confirmPopUp,changeStatus,id,onCloseModel}:PopUpProps) => {

    const changeTheStatus = ()=>{
        changeStatus(id)
        onCloseModel()
    }

    return (
        <>
            {/* <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Toggle modal
            </button> */}
            <div
                id="popup-modal"
                tabIndex={-1}
                className={`fixed items-center justify-center bg-gray-900 bg-opacity-50 ${confirmPopUp ? 'flex' : 'hidden'}  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full`}
            >
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow ">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
                            data-modal-hide="popup-modal"
                        >
                            
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
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
                            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                                Are you sure you want to continue?
                            </h3>
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                onClick={changeTheStatus}
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                onClick={()=>onCloseModel()}
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ConfirmPopUp
