import Api from "@/services/api";
import userRoutes from "@/services/endpoints/userEndpoints";
import errorHandle from "./errorHandler";
import BookingDetals from "@/app/components/vendor/bookingDetals";

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

interface Review{
    rating:number,
    review : string
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


export const findUser = async()=>{
    try {
        const res = await Api.get(userRoutes.findUser)
        return res
    } catch (error) {
        console.log(error)
    }
}


//findUserById 
export const findUserById = async(userId:string)=>{
    try {
        const res = await Api.get(`${userRoutes.findUserById}?userId=${userId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}



//change user name
export const changeName = async(name:string)=>{
    try {
        const res = await Api.put(userRoutes.changeName,{name})
        return res
    } catch (error) {
        console.log(error)
    }
}


//verify new mobile for changing
export const verifyNewMobile = async(mobile:string | number)=>{
    try {
        const res = Api.post(userRoutes.verifyNewMobile,{mobile})
        return res
    } catch (error) {
        console.log(error)
    }
}


//verify otp and change mobile
export const changeMobile = async(otp:string | number,mobile:number|string)=>{
    try {
        const res = Api.put(userRoutes.changeMobile,{otp,mobile})
        return res
    } catch (error) {
        console.log(error)
    }
}

//change password
export const changePassword = async(passwords:object)=>{
    try {
        const res = Api.put(userRoutes.changePassword,passwords)
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
export const restaurantsToDisplay = async(page:number)=>{
    try {
        const res = await Api.get(`${userRoutes.restaurantsToShow}?page=${page}`)
        return res
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
}



//restaurants for showing in map
export const restaurantsForMap= async()=>{
    try {
        const res = Api.get(userRoutes.restaurantsForMap)
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
export const kitchenItems = async(restaurantId:string,veg:boolean)=>{
    try {
        const res = await Api.get(`${userRoutes.kitchenItems}?restaurantId=${restaurantId}&veg=${veg}`)
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
        const err: Error = error as Error;
        return errorHandle(err);
    }
}


//user bookings
export const userBookings = async()=>{
    try {
        const res = await Api.get(userRoutes.userBookings)
        return res
    } catch (error) {
        // console.log(error);
        const err: Error = error as Error;
        return errorHandle(err);
    }
}


//cancel booking
export const cancelBooking = async(bookingId:string,reason:string)=>{
    try {
        const res = await Api.put(`${userRoutes.cancelBooking}?bookingId=${bookingId}`,{reason})
        return res
    } catch (error) {
        console.log(error)
        const err: Error = error as Error;
        return errorHandle(err);
    }
}


//search restaurants
export const searchRestaurants = async(searchQuery:string | null)=>{
    try {
        const res = await Api.get(`${userRoutes.searchRestaurants}?search=${searchQuery}`)
        return res
    } catch (error) {
        console.log(error)
    }
}


//filter restaurants
export const filterRestaurants = async(cuisines:string[],facilities:string[])=>{
    try {
        const res = await Api.post(userRoutes.filterRestaurants,{cuisines,facilities})
        return res
    } catch (error) {
        console.log(error)
    }
}


//popular restaurants
export const popularRestaurants =  async()=>{
    try {
        const res = await Api.get(userRoutes.popularRestaurants)
        return res
    } catch (error) {
        console.log(error)
    }
}



//user coupon 
export const couponsToShow = async()=>{
    try {
        const res = await Api.get(userRoutes.couponsToShow)
        return res
    } catch (error) {
        console.log(error)
    }
}


//pay with wallet
export const bookingWithWallet = async(BookingDetalis:FormData)=>{
    try {
        const res = await Api.post(userRoutes.payWithWallet,BookingDetalis)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const newConversation = async(recieverId:string)=>{
    try {
        const res = await Api.post(`${userRoutes.newConversation}?recieverId=${recieverId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const getMessages = async(conversationId:string)=>{
    try {
        const res = await Api.get(`${userRoutes.getMessages}?conversationId=${conversationId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

//get all messages
export const newMessage = async(text:string,conversationId:string,sender:string)=>{
    try {
        const res = await Api.post(userRoutes.newMessage,{text,conversationId,sender})
        return res
    } catch (error) {
        console.log(error)
    }
}


//get all conversations
export const getConversations = async(restaurantId:string)=>{
    try {
        const res = await Api.get(`${userRoutes.getConversations}?restaurantId=${restaurantId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}


//get single converstion
export const getConversation = async(conversationId:string)=>{
    try {
        const res = await Api.get(`${userRoutes.getConversation}?conversationId=${conversationId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}


//get all reviews of the restaurant
export const getReviews = async(restaurantId?:string)=>{
    try {
        const res = await Api.get(`${userRoutes.getReviews}?restaurantId=${restaurantId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

//get average rating
export const averageRating = async(restaurantId:string)=>{
    try {
        const res = await Api.get(`${userRoutes.getAverageRating}?restaurantId=${restaurantId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}



//checking user in booking for adding review
export const userInBooking = async(restaurantId:string)=>{
    try {
        const res = await Api.get(`${userRoutes.userInBooking}?restaurantId=${restaurantId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}


//add review
export const addReview = async(restaurantId:string | undefined,review:Review)=>{
    try {
        const res = await Api.post(`${userRoutes.addReview}?restaurantId=${restaurantId}`,review)
        return res
    } catch (error) {
        console.log(error)
    }
}


//findReview

export const findReview = async(restaurantId:string)=>{
    try {
        const res = await Api.get(`${userRoutes.findReview}?restaurantId=${restaurantId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}


//edit review
export const editReview = async(restaurantId:string | undefined,review:Review)=>{
    try {
        const res = await Api.put(`${userRoutes.editReview}?restaurantId=${restaurantId}`,review)
        return res
    } catch (error) {
        console.log(error)
    }
}


//forgot password user
export const forgotPasswordUser = async(mobile:string)=>{
    try {
        const res = Api.get(`${userRoutes.forgotPasswordUser}?mobile=${mobile}`)
        return res
    } catch (error) {
        console.log(error)
    }
}


//verify mobile
export const verifyMobile = async(otp:string | number) =>{
    try {
        const res = Api.post(userRoutes.verifyMobile,{otp})
        return res
    } catch (error) {
        console.log(error)
    }
}


export const forgotPasswordChangeUser = async(password:string)=>{
    try {
        const res = Api.put(userRoutes.forgotPasswordChangeUser,{password})
        return res
    } catch (error) {
        console.log(error)
    }
}