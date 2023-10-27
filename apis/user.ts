import Api from "@/services/api";
import userRoutes from "@/services/endpoints/userEndpoints";

interface Formvalues{
    name?: string | undefined;
    mobile?: string | undefined;
    email ?: string | undefined;
    password ?: string | undefined;
}


export const signup = async (userData: Formvalues)=>{
    try {
        const res = await Api.post(userRoutes.signup,userData)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const otpVerify = async (otp : string) =>{
    try {
        console.log(otp)
        const res = await Api.post(userRoutes.otpVerify,{otp})
        return res
    } catch (error) {
        console.log(error)
    }
}