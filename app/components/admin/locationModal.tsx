// import React from 'react'

// interface modalProps{
//     modal :boolean,
//     onCloseModal: ()=>void,
//     district :string,
//     locality:string,
//     setLocality:()=>void,
//     setDistrict:()=>void
//     onSubmit:()=>void
// }
// const LocationModal = ({modal,onCloseModal,district,locality,setDistrict,setLocality,onSubmit}:modalProps) => {
//     return (
//         <>
//             <div
//                 id="authentication-modal"
//                 tabIndex={-1}
//                 aria-hidden="true"
//                 className={`${modal ? 'flex' : 'hidden'} bg-gray-900 bg-opacity-60 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0  max-h-full`}
//             >
//                 <div className="relative p-4 w-full max-w-md max-h-full">
//                     {/* Modal content */}
//                     <div className="relative bg-white rounded-sm shadow ">
//                         {/* Modal header */}
//                         <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
//                             <h3 className="text-xl font-semibold text-gray-900 ">
//                                 Add a new locality
//                             </h3>
//                             <button
//                                 type="button"
//                                 className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
//                                 data-modal-hide="authentication-modal"
//                                 onClick={onCloseModal}
//                             >
//                                 <svg
//                                     className="w-3 h-3"
//                                     aria-hidden="true"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 14 14"
//                                 >
//                                     <path
//                                         stroke="currentColor"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                                     />
//                                 </svg>
//                                 <span className="sr-only">Close modal</span>
//                             </button>
//                         </div>
//                         {/* Modal body */}
//                         <div className="p-4 md:p-5">
//                             <form className="space-y-4" onSubmit={onSubmit}>
//                                 <div>
//                                     <label
//                                         htmlFor="email"
//                                         className="block mb-1 text-base font-medium text-gray-900 "
//                                     >
//                                         Enter locality
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="locality"
//                                         id="text"
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
//                                         placeholder=""
//                                         value={locality}
//                                         onChange={(e)=>setLocality(e.target.value)}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label
//                                         htmlFor="password"
//                                         className="block mb-2 text-base font-medium text-gray-900 "
//                                     >
//                                         Select District
//                                     </label>
//                                     <select name="" id="" value={district} onChange={(e)=>setDistrict(e.target.value)} className='border border-gray-300 w-full rounded-md py-2 px-1'>
//                                         <option className='py-2 px-1' value="">Select a district</option>
//                                         <option value="kasargod">Kasargod</option>
//                                         <option value="kannur">Kannur</option>
//                                         <option value="kozhikode">Kozhikode</option>
//                                         <option value="wayanad">Wayanad</option>
//                                         <option value="malappura">Malappuram</option>
//                                         <option value="thrissur">Thrissur</option>
//                                         <option value="ernakulam">Ernakulam</option>
//                                         <option value="palakkad">Palakkad</option>
//                                         <option value="idukki">Idukki</option>
//                                         <option value="alappuzha">Alappuzha</option>
//                                         <option value="kottayam">Kottayam</option>
//                                         <option value="pathanamthitta">Pathanamthitta</option>
//                                         <option value="kollam">Kollam</option>
//                                         <option value="thiruvananthapuram">Thiruvanthapuram</option>
//                                     </select>
//                                 </div>
                            
//                                 <button
//                                     type="submit"
//                                     className="w-full text-white bg-gray-700   focus:outline-none  rounded-lg text-base font-bold px-5 py-3 text-center "
//                                 >
//                                     Add Locality
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>

//     )
// }

// export default LocationModal
