import Cookies from "js-cookie"
import Axios from "../axios"
export const ReadNotifications = async(id:string) => {
let response = await Axios.post(`/notifications/read`,{id},
{headers:{"auth-token":Cookies.get("Records_session")}})
return response.data
}