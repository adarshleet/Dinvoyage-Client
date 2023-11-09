import React from 'react'

const Spinner = () => {
    return (
        <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className={`fixed top-0 left-0 right-0 z-50 justify-center flex items-center bg-gray-100 bg-opacity-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full`}>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" >Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
