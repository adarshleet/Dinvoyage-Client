'use client'
import React, { useState } from 'react'
import { FaEyeSlash,FaEye } from "react-icons/fa";

const Password = () => {
    const [toggle, setToggle] = useState(false)
    const passwordToggle = () => {
        setToggle(!toggle)
    }

    return (
        <div>
            <div className='flex border p-2.5 items-center mb-4'>
                <input type={toggle ? "text" : "password"} name="password" id="password" className=" text-gray-900 sm:text-sm block w-full focus:outline-none" placeholder="Password" />
                <p onClick={passwordToggle}>{toggle ? <FaEyeSlash /> : <FaEye/>} </p>
            </div>
        </div>
    )
}

export default Password
