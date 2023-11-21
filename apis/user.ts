import Api from "@/services/api";
import userRoutes from "@/services/endpoints/userEndpoints";
import errorHandle from "./errorHandler";

interface Formvalues{
    name?: string | undefined;
    mobile?: string | undefined;
    email ?: string | undefined;
    password ?: string | undefined;
}

interface guestData{
    restaurantId?:string;
    name?:string;
    mobile ?: string;
    guestCount ?: number;
    table ?: string,
    time ?: string,
    date ?: string
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
        const err: Error = error as Error;
        return errorHandle(err);
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



//all kitchen items
export const allKitchenItems = async(restaurantId:string)=>{
    try {
        const res = await Api.get(`${userRoutes.allKitchenItems}?restaurantId=${restaurantId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}


//BOOKING SIDE
//table counts left
export const tableCounts = async(guestData:guestData)=>{
    try {
        const res = await Api.post(userRoutes.seatCountsLeft,guestData)
        return res
    } catch (error) {
        console.log(error);
    }
}


//all kitchen items showing in booking page
export const kitchenItems = async(restaurantId:string)=>{
    try {
        const res = await Api.get(`${userRoutes.kitchenItems}?restaurantId=${restaurantId}`)
        return res
    } catch (error) {
        console.log(error);
    }
}


//payment in booking
export const payment =  async(bookingDetails:FormData)=>{
    try {
        const res = await Api.post(userRoutes.payment,bookingDetails)
        return res
    } catch (error) {
        console.log(error);
    }
}


//user bookings
export const userBookings = async()=>{
    try {
        const res = await Api.get(userRoutes.userBookings)
        return res
    } catch (error) {
        console.log(error);
    }
}


//cancel booking
export const cancelBooking = async(bookingId:string,reason:string)=>{
    try {
        const res = await Api.put(`${userRoutes.cancelBooking}?bookingId=${bookingId}`,{reason})
        return res
    } catch (error) {
        console.log(error)
    }
}