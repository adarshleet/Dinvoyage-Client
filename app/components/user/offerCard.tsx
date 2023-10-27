import React from 'react'

const OfferCard = () => {
  return (
    <div className='shadow-lg shadow-gray-500 p-3 bg-white rounded-md text-slate-500 m-2' style={{width:'8rem'}}>
      <h1 className='px-1 bg-slate-500 text-white w-1/2 text-center rounded-sm font-semibold mb-1'>FLAT</h1>
      <h1 className='text-5xl font-bold'>25%</h1>
      <h1 className='text-4xl text-center font-bold'>OFF</h1>
      <h1 className='text-center font-semibold'>Upto ₹500</h1>
    </div>
  )
}

export default OfferCard
