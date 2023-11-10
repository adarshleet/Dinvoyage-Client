import Api from "@/services/api";
import adminRoutes from "@/services/endpoints/adminEndpoints";

//admin login
export const login = async(admin:{email:string,password:string})=>{
    try {
        const res = Api.post(adminRoutes.login,admin)
        return res
    } catch (error) {
        console.log(error)
    }
}


//get all users
export const allUsers = async(currentPage:number)=>{
    try {
        const res = Api.get(`${adminRoutes.allUsers}?page=${currentPage}`)
        return res
    } catch (error) {
        console.log(error)
    }
}


//block a user
export const blockUser = async(id:string)=>{
    try {
        const res = Api.put(adminRoutes.blockUser,{id})
    } catch (error) {
        console.log(error)
    }
}


//getting all vendors
export const allVendors = async(currentPage:number)=>{
    try {
        const res = Api.get(`${adminRoutes.allVendors}?page:${currentPage}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const blockVendor = async(id:string)=>{
    try {
        const res = Api.put(adminRoutes.blockVendor,{id})
    } catch (error) {
        console.log(error);
    }
}


//getting all facilities for restaurant for listing
export const allFacilities = async()=>{
    try {
        const res = Api.get(adminRoutes.allFacilities)
        return res
    } catch (error) {
        console.log(error);
        
    }
}


//add new facility
export const addFacilities =  async(facility:string)=>{
    try {
        const res = Api.post(adminRoutes.addFacility,{facility})
        return res
    } catch (error) {
        console.log(error)
    }
}

//edit facility
export const editFacility = async(index:number,facility:string)=>{
    const res = Api.post(`${adminRoutes.editFacility}?facility=${facility}&index=${index}`)
    return res
}


//delete facility
export const deleteFacility = async(facility:string)=>{
    const res = Api.post(`${adminRoutes.deleteFacility}?facility=${facility}`)
    return res
}



//add new cuisine
export const addCuisines =  async(cuisine:string)=>{
    try {
        const res = Api.post(adminRoutes.addCuisine,{cuisine})
        return res
    } catch (error) {
        console.log(error)
    }
}


//edit cuisine
export const editCuisine = async(index:number,cuisine:string)=>{
    try {
        const res = Api.post(`${adminRoutes.editCuisine}?cuisine=${cuisine}&index=${index}`)
        return res
    } catch (error) {
        console.log(error)
    }
}


//delete cuisine
export const deleteCuisine =  async(cuisine:string)=>{
    try {
        const res = Api.post(`${adminRoutes.deleteCuisine}?cuisine=${cuisine}`)
        return res
    } catch (error) {
        console.log(error)
    }
}


//getting all cuisines for showing
export const allCuisines = async()=>{
    try {
        const res = Api.get(adminRoutes.allCuisines)
        return res
    } catch (error) {
        console.log(error);
    }
}



export const adminLogout = async()=>{
    try {
        const res = Api.get(adminRoutes.adminLogout)
        return res
    } catch (error) {
        console.log(error)
    }
}



//all restaurant requests
export const restaurantRequests = async () =>{
    try {
        const res = Api.get(adminRoutes.allRequests)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const singleRestaurantRequest = async (id:string) =>{
    try {
        const res = Api.get(`${adminRoutes.singleRestaurantRequest}/${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const changeRestaurantStatus = async (id:string,status:number) =>{
    try {
        console.log(id,status)
        const res = Api.post(`${adminRoutes.changeRestaurantStatus}?id=${id}&status=${status}`)
        return res
    } catch (error) {
        console.log(error)
    }
}