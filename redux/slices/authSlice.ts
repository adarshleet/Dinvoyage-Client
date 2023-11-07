import { createSlice } from "@reduxjs/toolkit";

interface InitialState{
    userLoggedIn : string | null,
    adminLoggedIn : string | null,
    vendorLoggedIn : string | null
}

const storedUserInfo = typeof window !== 'undefined' ? localStorage.getItem('userInfo') : null
const storedAdminInfo = typeof window !== 'undefined' ? localStorage.getItem('adminInfo') : null
const storedVendorInfo = typeof window !== 'undefined' ? localStorage.getItem('vendorInfo') : null

const initialState:InitialState ={
    userLoggedIn : storedUserInfo ? JSON.parse(storedUserInfo) : null,

    adminLoggedIn : storedAdminInfo ? JSON.parse(storedAdminInfo) : null,

    vendorLoggedIn : storedVendorInfo ? JSON.parse(storedVendorInfo) : null
}



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUserLogin : (state,action) => {
            state.userLoggedIn = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        setUserLogout: (state)=>{
            state.userLoggedIn = null
            localStorage.removeItem('userInfo')
        },
        setVendorLogin:(state,action) =>{
            state.vendorLoggedIn = action.payload
            localStorage.setItem('vendorInfo' , JSON.stringify(action.payload))
        },
        setVendorLogout : (state) =>{
            state.vendorLoggedIn = null
            localStorage.removeItem('vendorInfo')
        },
        setAdminLogin:(state,action)=>{
            state.adminLoggedIn = action.payload
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        setAdminLogout: (state) =>{
            state.adminLoggedIn = null
            localStorage.removeItem('adminInfo')
        }
    }
})


export const {setAdminLogin,setAdminLogout,setUserLogin,setUserLogout,setVendorLogin,setVendorLogout} = authSlice.actions

export default authSlice.reducer

