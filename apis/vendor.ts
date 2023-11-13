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


interface itemData{
    _id ?: string,
    itemName ?: string,
    category ?: string,
    price ?: string,
    veg ?:boolean,
    description ?: string,
    isListed ?: boolean
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
        const res = await Api.post(vendorRoutes.addRestaurant,restaurantData)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const getRestaurant = async()=>{
    try {
        const res = await Api.get(vendorRoutes.getRestaurant)
        return res
    } catch (error) {
        console.log(error)
    }
}



export const selectedCuisinesAndFacilities = async()=>{
    try {
        const res = await Api.get(vendorRoutes.selectedCuisinesAndFacilities)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const SetSelectedCuisines = async(cuisines:Array<string>,restaurantId:string)=>{
    try {
        const res = await Api.post(`${vendorRoutes.selectCuisines}?restaurantId=${restaurantId}`,{cuisines})
        return res
    } catch (error) {
        console.log(error)
    }
}


export const SetSelectedFacilities = async(facilities:Array<string>,restaurantId:string)=>{
    try {
        const res = await Api.post(`${vendorRoutes.selectFacilities}?restaurantId=${restaurantId}`,{facilities})
        return res
    } catch (error) {
        console.log(error)
    }
}



export const allCategories = async(restaurantId:string)=>{
    try {
        const res = await Api.get(`${vendorRoutes.allCategories}?restaurantId=${restaurantId}`)
        return res
    } catch (error) {
        console.log(error);
        
    }
}


export const addRestaurantCategory =  async(restaurantId:string,category:string)=>{
    const res = await Api.post(`${vendorRoutes.addRestaurantCategory}?restaurantId=${restaurantId}`,{category})
    return res
}



export const editRestaurantCategory = async(categoryId:string,category:string)=>{
    const res = await Api.post(`${vendorRoutes.editRestaurantCategory}?categoryId=${categoryId}`,{category})
    return res
}



export const changeCategoryStatus = async (categoryId:string)=>{
    const res = await Api.post(`${vendorRoutes.changeCategoryStatus}?categoryId=${categoryId}`)
    return res
}


export const getAllKitchenItems = async(restaurantId:string)=>{
    const res = await Api.get(`${vendorRoutes.getAllKitchenItems}?restaurantId=${restaurantId}`)
    return res
}


export const addItemToKitchen = async(restauarntId:string,itemData:itemData)=>{
    const res = await Api.post(`${vendorRoutes.addItemToKitchen}?restaurantId=${restauarntId}`,{itemData})
    return res
}


export const vendorLogout = async()=>{
    try {
        const res = await Api.get(vendorRoutes.vendorLogout)
        return res
    } catch (error) {
        console.log(error)
    }
}