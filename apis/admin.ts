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
export const allUsers = async()=>{
    try {
        const res = Api.get(adminRoutes.allUsers)
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