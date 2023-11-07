import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../redux/slices/authSlice'


const store = configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: true
});

export default store;