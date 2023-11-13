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
        const res = await Api.post(userRoutes.otpVerify,{otp})
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
}
 

export const login = async (userData:Formvalues)=>{
    try {
        const res = await Api.post(userRoutes.login,userData)
        console.log(res.data.data)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const logout = async()=>{
    try {
        const res = await Api.get(userRoutes.logout)
        return res
    } catch (error) {
        console.log(error)
    }
}




//restaurant in display
export const restaurantsToDisplay = async()=>{
    try {
        const res = await Api.get(userRoutes.restaurantsToShow)
        return res
    } catch (error) {
        console.log(error)
    }
}



//single restaurant page
export const singleRestaurant = async(restauarntId:string)=>{
    try {
        const res = await Api.get(`${userRoutes.singleRestaurant}?restaurantId=${restauarntId}`)
        return res
    } catch (error) {
        console.log(error);
        
    }
}