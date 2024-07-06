import Cookies from "js-cookie"
import Axios from "../axios"
export const GetNotifications = async() => {
let response = await Axios.post(`/notifications/get`,{},
{headers:{"auth-token":Cookies.get("Records_session")}})
return response.data
}