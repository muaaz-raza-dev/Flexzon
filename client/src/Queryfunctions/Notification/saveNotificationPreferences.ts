import Cookies from "js-cookie"
import Axios from "../axios"
import { Inotification } from "@/app/Types/ICredits"
export const saveNotificationSettings = async(notificationSettings:Inotification) => {
let response = await Axios.post(`/notifications/change`,{notificationSettings},
{headers:{"auth-token":Cookies.get("Records_session")}})
return response.data
}
