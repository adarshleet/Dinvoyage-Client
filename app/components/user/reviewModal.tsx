'use client'
import React from 'react'
import { GoStarFill, GoStar } from "react-icons/go";
import '../../restaurant/[id]/rating.css'
import { IoMdClose } from "react-icons/io";


interface ratingProps {
    rating: number,
    handleClick: (index: number) => void,
    reviewModal : boolean,
    closeModal : ()=>void,
    userFound : boolean,
    review : string,
    setReview : (review:string)=>void,
    handleReviewSubmit : ()=>void,
    reviewFound :boolean
}

const Reviews = ({ rating, handleClick,reviewModal,closeModal,userFound,review,setReview,handleReviewSubmit,reviewFound }: ratingProps) => {
    return (
        <>

            {/* Main modal */}
            <div
                id="select-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`${reviewModal ? 'flex' : 'hidden'} flex-col overflow-y-auto overflow-x-hidden fixed bg-gray-800 bg-opacity-60 shadow-md  top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 max-h-full`}
            >
                <div className="relative p-4 w-full max-w-sm max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow ">
                        <div className="flex flex-col gap-2 items-center justify-center bg-teal-400 p-4 md:p-5 border-b rounded-t w-full">
                            <div
                                className={`py-3 px-3 rounded-md w-12 h-16 text-2xl font-bold text-white rating-face face-${rating}`}
                            ></div>
                            <div className='flex  gap-2'>


                                {[1, 2, 3, 4, 5].map((index) => (
                                    <span
                                        key={index}
                                        onClick={() => handleClick(index)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {index <= rating ? (
                                            <GoStarFill className="text-3xl" style={{ color: 'gold' }} />
                                        ) : (
                                            <GoStar className="text-3xl text-gray-900" />
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className=" md:p-5">
                            <div>
                                <textarea cols={35} rows={8} value={review} onChange={(e)=>setReview(e.target.value)} className='resize-none outline-none md:p-0 p-2' placeholder='Tell your experience'></textarea>
                            </div>
                            {!userFound && <p className='mb-1 text-xs text-center'>Need a succesfull booking for rate the restaurant</p>}
                            <button className='bg-slate-700 w-full font-bold text-white py-2 rounded-sm' disabled={!userFound} onClick={handleReviewSubmit}>{reviewFound ? 'Edit Review' : 'Submit'}</button>
                        </div>
                    </div>
                </div>
                <div className='p-2 bg-white bg-opacity-50 rounded-full cursor-pointer' onClick={closeModal}><IoMdClose className="text-lg"/></div>
            </div>
        </>

    )
}

export default Reviews
