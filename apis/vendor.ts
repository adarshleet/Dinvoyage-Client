import Api from "@/services/api";
import vendorRoutes from "@/services/endpoints/vendorEndpoints";


interface Formvalues{
    name?: string | undefined;
    mobile?: string | undefined;
    email ?: string | undefined;
    password ?: string | undefined;
}

interface Restaurant{
    id ?: string | undefined;
    restaurantName?: string | undefined;
    landmark?:string | undefined;
    locality?:string | undefined;
    district?:string | undefined;
    openingTime?:string | undefined ;
    closingTime?:string | undefined ;
    minCost?:string | undefined ;
    contactNumber?:string | undefined ;
    tableCounts?: object | undefined;
    banners?: Array<string> | undefined
}

export const register = async(vendorData:Formvalues)=>{
    try {
        const res = Api.post(vendorRoutes.register,vendorData)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const otpVerifyVendor = async (otp : string) =>{
    try {
        const res = await Api.post(vendorRoutes.otpVerify,{otp})
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const vendorLogin = async (vendor : Formvalues)=>{
    try {
        const res = await Api.post(vendorRoutes.vendorLogin,vendor)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const addRestaurant = async (restaurantData:FormData)=>{
    try {
        console.log(restaurantData)
        const res = await Api.post(vendorRoutes.addRestaurant,restaurantData)
        return res
    } catch (error) {
        console.log(error)
    }
}