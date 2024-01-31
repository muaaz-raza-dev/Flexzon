import { toast } from "react-hot-toast"
import Axios from "../axios"
import Cookies from "js-cookie"
const GetOtp = async( email:string) => {
let response = await Axios.post("/otp/",{  email,  })
if (response.data.success) {
    Cookies.set("ROR",response.data.TemporaryToken,{expires:new Date(new Date().getTime()+(1000*60*60))})
    toast.success(response.data.msg)
}

return response.data
}

export const VerifyOtp = async( password:string , otp:string) => {
    let response = await Axios.post("/otp/verify",{password, otp },{headers:{"Temp_token":Cookies.get("ROR")}})

    return response.data
    }

export default GetOtp
