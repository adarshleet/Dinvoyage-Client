import React from 'react'


interface categoryProps{
    show:boolean,
    closeModal : ()=>void,
    categoryChange:(e :React.ChangeEvent<HTMLInputElement>)=>void,
    addCategory : ()=>void,
    category:string,
    editMode : boolean,
    categoryToEdit : string,
    editCategory:()=>void
}

const CategoryModal = ({show,closeModal,categoryChange,addCategory,category,editMode,categoryToEdit,editCategory}:categoryProps) => {

    const handleButton = ()=>{
        if(editMode){
            editCategory()
        }
        else{
            addCategory()
        }
    }

    return (
        <>
            <div
                id="crud-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`${show ? 'flex' : 'hidden'} fixed justify-center items-center bg-gray-900 bg-opacity-50 overflow-y-auto overflow-x-hidden  top-0 right-0 left-0 z-50 w-full inset-0  max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow ">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-lg font-semibold text-gray-900 ">
                                {editMode ? 'Edit Category' : 'Add New Category'}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                                data-modal-toggle="crud-modal"
                                onClick={closeModal}
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
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="Enter the category"
                                        value={category}
                                        onChange={categoryChange}
                                    />
                                </div>
                                
                                
                                
                            </div>
                            <button
                                className="text-white inline-flex items-center justify-center w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                onClick={handleButton}
                            >
                                <svg
                                    className="me-1 -ms-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {editMode ? 'Edit Category' : 'Add Category'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CategoryModal
