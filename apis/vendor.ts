import Api from "@/services/api";
import vendorRoutes from "@/services/endpoints/vendorEndpoints";


interface Formvalues{
    name?: string | undefined;
    mobile?: string | undefined;
    email ?: string | undefined;
    password ?: string | undefined;
}


export const register = async(vendorData:Formvalues)=>{
    try {
        const res = Api.post(vendorRoutes.register,vendorData)
        return res
    } catch (error) {
        console.log(error)
    }
}
