import Api from "@/services/api";
import adminRoutes from "@/services/endpoints/adminEndpoints";


export const login = async(admin:{email:string,password:string})=>{
    try {
        const res = Api.post(adminRoutes.login,admin)
        return res
    } catch (error) {
        console.log(error)
    }
}