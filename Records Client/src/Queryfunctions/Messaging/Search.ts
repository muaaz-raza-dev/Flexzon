import Cookies from "js-cookie"
import Axios from "../axios"
export const SearchUsers = async(username:string,chatId:string,invite:boolean) => {
let response = await Axios.post(`/chats/search/${username}`,invite?{chatId}:{},
{headers:{"auth-token":Cookies.get("Records_session")}})
return response.data
}