'use client'
import React, { useState } from 'react'
import { FaEyeSlash,FaEye } from "react-icons/fa";

interface PasswordProps {
    value: string;
    onChange: (value: string) => void;
}

const Password = ({value,onChange}:PasswordProps) => {
    const [toggle, setToggle] = useState(false)
    const passwordToggle = () => {
        setToggle(!toggle)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <div className='flex border p-2.5 items-center mb-2'>
                <input type={toggle ? "text" : "password"} name="password" id="password" value={value} onChange={handlePasswordChange}  className=" text-gray-900 sm:text-sm block w-full focus:outline-none" placeholder="Password" />
                <p onClick={passwordToggle}>{toggle ? <FaEyeSlash /> : <FaEye/>} </p>
            </div>
        </div>
    )
}

export default Password
